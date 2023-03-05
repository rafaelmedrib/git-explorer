const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { userRepository } = require('../repositories/userRepository');
const { favoritesRepository } = require('../repositories/favoritesRepository');
const { JWT_SECRET } = require("../config/environment");

class AuthService {
    constructor() {
        this.userRepository = userRepository;
    }

    async register(email, password) {
        const userExists = await this.userRepository.findByEmail(email)

        if(userExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userRepository.create({
            email,
            password: hashedPassword
        })

        await favoritesRepository.create({
            id: user.favorites
        });

        return true;
    }

    async login(email, password) {
        const user = await this.userRepository.findByEmail(email)

        if(!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Incorrect credentials');
        }

        const token = jwt.sign({ id: user.id , favorites: user.favorites }, JWT_SECRET, { expiresIn: '1h' });

        return token;
    }

    async authenticate(token) {
        try {
            const { id, favorites } = jwt.verify(token, JWT_SECRET);

            return {
                id,
                favorites
            }
        } catch (e) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = {
    AuthService
}
