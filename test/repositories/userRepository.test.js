const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../src/models/User');
const userRepository = require('../../src/repositories/userRepository');

describe('UserRepository', () => {
    describe('findAll', () => {
        it('should return all users', async () => {
            const fakeUsers = [
                {
                    id: '123',
                    email: 'user1@example.com',
                    favorites: null
                },
                {
                id: '456',
                email: 'user2@example.com',
                favorites: '789'
                },
            ];

            const findAllFake = sinon.fake.returns(fakeUsers);
            sinon.replace(User, 'findAll', findAllFake);

            const users = await userRepository.findAll();
            expect(users).to.deep.equal(fakeUsers);

            sinon.restore();
        });
    });

    describe('findById', () => {
        it('should return the user with the specified id', async () => {
            const id = '123';
            const fakeUser = {id, email: 'user1@example.com', favorites: null};

            const findByPkFake = sinon.fake.returns(fakeUser);
            sinon.replace(User, 'findByPk', findByPkFake);

            const user = await userRepository.findById(id);
            expect(user).to.deep.equal(fakeUser);

            sinon.restore();
        });

        it('should return null when the user is not found', async () => {
            const id = '789';

            const findByPkFake = sinon.fake.returns(null);
            sinon.replace(User, 'findByPk', findByPkFake);

            const user = await userRepository.findById(id);
            expect(user).to.be.null;

            sinon.restore();
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const userData = {email: 'user3@example.com', favorites: '456'};
            const fakeUser = {id: '789', ...userData};

            const createFake = sinon.fake.returns(fakeUser);
            sinon.replace(User, 'create', createFake);

            const user = await userRepository.create(userData);
            expect(user).to.deep.equal(fakeUser);

            sinon.restore();
        });
    });

    describe('update', () => {
        it('should update the user with the specified id', async () => {
            const id = '123';
            const userData = {email: 'user1@example.com', favorites: '789', update: () => [1]};
            const updatedUser = {id, ...userData};

            const findByPkFake = sinon.fake.returns(updatedUser);
            sinon.replace(User, 'findByPk', findByPkFake);

            const updateFake = sinon.fake.returns([1]);
            sinon.replace(updatedUser, 'update', updateFake);

            const response = await userRepository.update(id, userData);
            expect(response).to.deep.equal([1]);

            sinon.restore();
        });

        it('should return null when the user is not found', async () => {
            const id = '789';
            const userData = {email: 'user3@example.com', favorites: '123'};

            const findByPkFake = sinon.fake.returns(null);
            sinon.replace(User, 'findByPk', findByPkFake);

            const user = await userRepository.update(id, userData);
            expect(user).to.be.null;

            sinon.restore();
        });
    });
    describe('delete', function () {
        it('should delete the user specified id', async () => {
            const id = '123';
            const userData = {email: 'user1@example.com', favorites: '789', destroy: () => {}};
            const user = {id, ...userData};

            const findByPkFake = sinon.fake.returns(user);
            sinon.replace(User, 'findByPk', findByPkFake);

            const destroyFake = sinon.fake.returns(true);
            sinon.replace(user, 'destroy', destroyFake);

            const response = await userRepository.delete(id, userData);
            expect(response).to.deep.equal(true);

            sinon.restore();
        });

        it('should return false when the user is not found', async () => {
            const id = '789';

            const findByPkFake = sinon.fake.returns(null);
            sinon.replace(User, 'findByPk', findByPkFake);

            const response = await userRepository.delete(id);
            expect(response).to.be.false;

            sinon.restore();
        });
    });
});
