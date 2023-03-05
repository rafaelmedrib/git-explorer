const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { userRepository } = require('../repositories/userRepository');
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

        const hashedPassword = bcrypt.hash(password)

        await this.userRepository.create({
            email,
            password: hashedPassword
        })

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

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        return token;
    }
}

module.exports = {
    authService: new AuthService()
}
