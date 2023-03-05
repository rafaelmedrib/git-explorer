const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authService } = require('../../src/services/authService');
const { userRepository } = require('../../src/repositories/userRepository');
const { favoritesRepository } = require('../../src/repositories/favoritesRepository');
const {JWT_SECRET} = require("../../src/config/environment");

describe('Auth Service', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('register', function () {
        it('should return true when successfully registered a new user', async () => {
            const email = 'user1@example.com';
            const password = 'secret';
            const fakeUser = {id: '123', favorites: '456', email, password};

            const findByEmailFake = sinon.fake.returns(null);
            sinon.replace(userRepository, 'findByEmail', findByEmailFake);

            const createUserFake = sinon.fake.returns(fakeUser);
            sinon.replace(userRepository, 'create', createUserFake);

            const createFavoritesFake = sinon.fake.returns({
                id: '465',
                urls: []
            });
            sinon.replace(favoritesRepository, 'create', createFavoritesFake);

            const response = await authService.register(email, password);
            expect(response).to.be.true;
        });

        it('should throw and error when user already exists', () => {
            const email = 'user1@example.com';
            const password = 'secret';
            const fakeUser = {id: '123', favorites: '456', email, password};

            const findByEmailFake = sinon.fake.returns(fakeUser);
            sinon.replace(userRepository, 'findByEmail', findByEmailFake);

            return authService
                .register(email, password)
                .catch(reason => {
                    expect(reason).to.be.instanceof(Error);
                })
        });
    });

    describe('login', function () {
        it('should return a signed JWT when credentials are correct', async () => {
            const email = 'user1@example.com';
            const password = 'secret';
            const fakeUser = { id: '123', favorites: '456', email, password };

            const findByEmailFake = sinon.fake.returns(fakeUser);
            sinon.replace(userRepository, 'findByEmail', findByEmailFake);

            const compareFake = sinon.fake.returns(true);
            sinon.replace(bcrypt, 'compare', compareFake);

            const response = await authService.login(email, password);
            const decodedJwt = jwt.verify(response, JWT_SECRET);
            expect(decodedJwt.id).to.equal(fakeUser.id);
            expect(decodedJwt.favorites).to.equal(fakeUser.favorites);
        });

        it('should throw an error when user is not found', function () {
            const email = 'user1@example.com';
            const password = 'secret';

            const findByEmailFake = sinon.fake.returns(null);
            sinon.replace(userRepository, 'findByEmail', findByEmailFake);

            return authService
                .login(email, password)
                .catch(reason => {
                    expect(reason).to.be.instanceof(Error);
                })
        });

        it('should return an error when password is incorrect', function () {
            const email = 'user1@example.com';
            const wrongPassword = 'wrongSecret';
            const fakeUser = {id: '123', favorites: '456', email, password: 'secret'};

            const findByEmailFake = sinon.fake.returns(fakeUser);
            sinon.replace(userRepository, 'findByEmail', findByEmailFake);

            const compareFake = sinon.fake.returns(false);
            sinon.replace(bcrypt, 'compare', compareFake);

            return authService
                .login(email, wrongPassword)
                .catch(reason => {
                    expect(reason).to.be.instanceof(Error);
                })
        });
    });

    describe('authenticate', () => {
        it('should return user and favorites id\'s', async () => {
            const token = 'token';
            const decodedToken = {
                id: '123',
                favorites: '456'
            }

            const verifyFake = sinon.fake.returns(decodedToken);
            sinon.replace(jwt, 'verify', verifyFake);

            const response = await authService.authenticate(token);
            expect(response.id).to.equal(decodedToken.id);
            expect(response.favorites).to.equal(decodedToken.favorites);
        });

        it('should throw and error when incorrect token is provided', () => {
            const wrongToken = 'wrongToken';

            const verifyFake = sinon.fake.throws(new Error());
            sinon.replace(jwt, 'verify', verifyFake);

            return authService
                .authenticate(wrongToken)
                .catch(reason => {
                    expect(reason).to.be.instanceof(Error);
                })
        });
    });
});
