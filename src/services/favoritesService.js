const { favoritesRepository } = require('../repositories/favoritesRepository');
const { AuthService } = require('../services/authService')

class FavoritesService {
    constructor() {
        this.favoritesRepository = favoritesRepository;
        this.authenticate = new AuthService().authenticate;
    }

    async save(token, data) {
        try {
            const { favorites: favoritesId } = await this.authenticate(token);

            const { urls } = await this.favoritesRepository.findById(favoritesId)

            await this.favoritesRepository.update(favoritesId, { urls: [ data, ...urls ] });

            return true
        } catch (e) {
            throw new Error('Failed to save on favorites');
        }
    }

    async getAll(token) {
        try {
            const { favorites: favoritesId } = await this.authenticate(token);

            const { urls } = await this.favoritesRepository.findById(favoritesId);

            return urls;
        } catch (e) {
            throw new Error('Failed to retrieve favorites');
        }
    }
}

module.exports = {
    favoritesService: new FavoritesService()
}
