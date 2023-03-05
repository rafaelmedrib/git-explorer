const { User } = require('../models/User');

class UserRepository {
    async findAll() {
        return User.findAll();
    }

    async findById(id) {
        return User.findByPk(id);
    }

    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async create(data) {
        return User.create(data);
    }

    async update(id, data) {
        const user = await User.findByPk(id);
        if (user) {
            return user.update(data);
        }
        return null;
    }

    async delete(id) {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            return true;
        }
        return false;
    }
}

module.exports = {
    userRepository: new UserRepository()
}

