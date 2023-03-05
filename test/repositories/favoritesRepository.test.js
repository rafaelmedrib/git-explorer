const { expect } = require('chai');
const sinon = require('sinon');

const { Favorites } = require('../../src/models/Favorites');
const { favoritesRepository }= require('../../src/repositories/favoritesRepository');

describe('FavoritesRepository', () => {
    describe('findAll', () => {
        it('should return all favorites', async () => {
            const fakeFavorites = [
                {
                    id: '123',
                    urls: [
                        'url1',
                        'url2'
                    ]
                },
                {
                    id: '456',
                    urls: [],
                },
            ];

            const findAllFake = sinon.fake.returns(fakeFavorites);
            sinon.replace(Favorites, 'findAll', findAllFake);

            const favorites = await favoritesRepository.findAll();
            expect(favorites).to.deep.equal(fakeFavorites);

            sinon.restore();
        });
    });

    describe('findById', () => {
        it('should return the favorites with the specified id', async () => {
            const id = '123';
            const fakeFavorites = {id, urls: []};

            const findByPkFake = sinon.fake.returns(fakeFavorites);
            sinon.replace(Favorites, 'findByPk', findByPkFake);

            const favorites = await favoritesRepository.findById(id);
            expect(favorites).to.deep.equal(fakeFavorites);

            sinon.restore();
        });

        it('should return null when the favorites is not found', async () => {
            const id = '789';

            const findByPkFake = sinon.fake.returns(null);
            sinon.replace(Favorites, 'findByPk', findByPkFake);

            const favorites = await favoritesRepository.findById(id);
            expect(favorites).to.be.null;

            sinon.restore();
        });
    });

    describe('create', () => {
        it('should create a new favorites', async () => {
            const favoritesData = {
                urls: [
                    'url1',
                    'url2'
                ]
            };
            const fakeFavorites = { id: '789', ...favoritesData };

            const createFake = sinon.fake.returns(fakeFavorites);
            sinon.replace(Favorites, 'create', createFake);

            const favorites = await favoritesRepository.create(favoritesData);
            expect(favorites).to.deep.equal(fakeFavorites);

            sinon.restore();
        });
    });

    describe('update', () => {
        it('should update the favorites with the specified id', async () => {
            const id = '123';
            const favoritesData = {
                urls: [
                    'url1',
                    'url2'
                ],
                update: () => {}
            }
            const updatedFavorites = {id, ...favoritesData};

            const findByPkFake = sinon.fake.returns(updatedFavorites);
            sinon.replace(Favorites, 'findByPk', findByPkFake);

            const updateFake = sinon.fake.returns([1]);
            sinon.replace(updatedFavorites, 'update', updateFake);

            const response = await favoritesRepository.update(id, favoritesData);
            expect(response).to.deep.equal([1]);

            sinon.restore();
        });

        it('should return false when the favorites is not found', async () => {
            const id = '789';
            const favoritesData = {
                urls: []
            };

            const findByPkFake = sinon.fake.returns(null);
            sinon.replace(Favorites, 'findByPk', findByPkFake);

            const response = await favoritesRepository.update(id, favoritesData);
            expect(response).to.be.null;

            sinon.restore();
        });
    });
    describe('delete', function () {
        it('should delete the favorites specified id', async () => {
            const id = '123';
            const userData = {
                urls: [],
                destroy: () => {}
            };
            const favorites = { id, ...userData };

            const findByPkFake = sinon.fake.returns(favorites);
            sinon.replace(Favorites, 'findByPk', findByPkFake);

            const destroyFake = sinon.fake.returns(true);
            sinon.replace(favorites, 'destroy', destroyFake);

            const response = await favoritesRepository.delete(id, userData);
            expect(response).to.deep.equal(true);

            sinon.restore();
        });

        it('should return false when the favorites is not found', async () => {
            const id = '789';

            const findByPkFake = sinon.fake.returns(null);
            sinon.replace(Favorites, 'findByPk', findByPkFake);

            const response = await favoritesRepository.delete(id);
            expect(response).to.be.false;

            sinon.restore();
        });
    });
});
