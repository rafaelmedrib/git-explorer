const { Favorites } = require('../models/Favorites');

class FavoritesRepository {
    async findAll() {
        return Favorites.findAll();
    }

    async findById(id) {
        return Favorites.findByPk(id);
    }

    async create(data) {
        return Favorites.create(data);
    }

    async update(id, data) {
        const favorites = await Favorites.findByPk(id);
        if (favorites) {
            return favorites.update(data);
        }
        return null;
    }

    async delete(id) {
        const favorites = await Favorites.findByPk(id);
        if (favorites) {
            await favorites.destroy();
            return true;
        }
        return false;
    }
}

module.exports = {
  favoritesRepository: new FavoritesRepository()
}
