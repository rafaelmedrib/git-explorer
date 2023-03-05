const { expect } = require('chai');
const sinon = require('sinon');

const { authService } = require('../../src/services/authService');
const { favoritesService } = require('../../src/services/favoritesService')
const { favoritesRepository } = require("../../src/repositories/favoritesRepository");
const jwt = require("jsonwebtoken");

describe('Favorites Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('save', () => {
        it('should return true when save succeeds', async () => {
            const token = 'token';
            const data = 'url1';
            const decodedToken = {
                id: '123',
                favorites: '456'
            }

            const verifyFake = sinon.fake.returns(decodedToken);
            sinon.replace(jwt, 'verify', verifyFake);

            const findByIdFake = sinon.fake.returns({
                urls: ['url']
            });
            sinon.replace(favoritesRepository, 'findById', findByIdFake);

            const updateFake = sinon.fake.returns(null);
            sinon.replace(favoritesRepository, 'update', updateFake);

            const response = await favoritesService.save(token, data);
            expect(response).to.be.true;
        });

        it('should throw an error when token is incorrect', () => {
            const wrongToken = 'wrongToken';
            const data = 'url1';

            const verifyFake = sinon.fake.throws(new Error());
            sinon.replace(jwt, 'verify', verifyFake);

            return favoritesService
                .save(wrongToken, data)
                .catch(reason => {
                    expect(reason).to.be.instanceof(Error);
                });
        });
    });

    describe('getAll', () => {
        it('should retrieve all favorite urls', async () => {
            const token = 'token';
            const decodedToken = {
                id: '123',
                favorites: '456'
            }
            const urls = [
                'url1',
                'url2',
                'url3'
            ];
            const fakeFavorites = { id: decodedToken.favorites, urls };

            const verifyFake = sinon.fake.returns(decodedToken);
            sinon.replace(jwt, 'verify', verifyFake);

            const findByIdFake = sinon.fake.returns(fakeFavorites);
            sinon.replace(favoritesRepository, 'findById', findByIdFake);

            const response = await favoritesService.getAll(token);
            expect(response).to.deep.equal(urls);
        });

        it('should throw an error when token fails', () => {
            const wrongToken = 'wrongToken';

            const verifyFake = sinon.fake.throws(new Error());
            sinon.replace(jwt, 'verify', verifyFake);

            return favoritesService
                .getAll(wrongToken)
                .catch(reason => {
                    expect(reason).to.be.instanceof(Error);
                });
        });
    });
});
