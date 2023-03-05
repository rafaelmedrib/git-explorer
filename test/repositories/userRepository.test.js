const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../src/models/User');
const { userRepository } = require('../../src/repositories/userRepository');

describe('UserRepository', () => {
    afterEach(() => {
        sinon.restore();
    })

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
        });

        it('should return null when the user is not found', async () => {
            const id = '789';

            const findByPkFake = sinon.fake.returns(null);
            sinon.replace(User, 'findByPk', findByPkFake);

            const user = await userRepository.findById(id);
            expect(user).to.be.null;
        });
    });

    describe('findByEmail', function () {
        it('should return the user with the specified email', async () => {
            const email = 'user1@example.com';
            const userData = { id: '123', password: 'secret', favorites: null };
            const fakeUser = { email, ...userData };

            const findOneFake = sinon.fake.returns(fakeUser);
            sinon.replace(User, 'findOne', findOneFake);

            const user = await userRepository.findByEmail(email);
            expect(user).to.deep.equal(fakeUser);
            expect(findOneFake.calledOnce).to.be.true;
            expect(findOneFake.getCall(0).firstArg).to.deep.equal({ where: { email } });
        });

        it('should return null when the user is not found', async () => {
            const email = 'user1@example.com';

            const findOneFake = sinon.fake.returns(null);
            sinon.replace(User, 'findOne', findOneFake);

            const user = await userRepository.findByEmail(email);
            expect(user).to.be.null;
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
        });

        it('should return null when the user is not found', async () => {
            const id = '789';
            const userData = {email: 'user3@example.com', favorites: '123'};

            const findByPkFake = sinon.fake.returns(null);
            sinon.replace(User, 'findByPk', findByPkFake);

            const user = await userRepository.update(id, userData);
            expect(user).to.be.null;
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
        });

        it('should return false when the user is not found', async () => {
            const id = '789';

            const findByPkFake = sinon.fake.returns(null);
            sinon.replace(User, 'findByPk', findByPkFake);

            const response = await userRepository.delete(id);
            expect(response).to.be.false;
        });
    });
});
