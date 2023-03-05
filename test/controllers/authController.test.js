const { expect } = require('chai');
const sinon = require('sinon');
const { faker } = require("@faker-js/faker");

const { AuthController } = require('../../src/controllers/authController');

describe('AuthController', function() {
    let email = faker.internet.email(undefined, undefined, 'dontfollow.me');
    let password = faker.internet.password(8);
    let authServiceFake;
    let loggerFake;
    let inquirer;
    let printBasicFake;
    let errorFake;
    let promptFake;

    describe('signup', () => {
        it('should register a new user', async () => {
            const registerFake = sinon.fake.resolves(true);
            authServiceFake = {
                register: registerFake
            };

            promptFake = sinon.stub();
            promptFake.onCall(0).resolves({ email, password });
            promptFake.onCall(1).resolves(true);
            inquirer = {
                prompt: promptFake
            }

            printBasicFake = sinon.fake();
            errorFake = sinon.fake();
            loggerFake = {
                printBasic: printBasicFake,
                error: errorFake
            };

            const authController = new AuthController(authServiceFake, loggerFake, inquirer);

            await authController.signup()

            expect(registerFake.firstCall.args).to.deep.equal([ email, password ]);
            expect(printBasicFake.called).to.be.true;
            expect(errorFake.called).to.be.false;
            expect(promptFake.calledTwice).to.be.true;
        });

        afterEach(() => {
            sinon.restore();
        })

        it('should return false if an error occurs', async () => {
            const registerFake = sinon.fake.throws('User already exists');
            authServiceFake = {
                register: registerFake
            };

            promptFake = sinon.stub();
            promptFake.onCall(0).resolves({ email, password });
            promptFake.onCall(1).resolves(true);
            inquirer = {
                prompt: promptFake
            }

            printBasicFake = sinon.fake();
            errorFake = sinon.fake();
            loggerFake = {
                printBasic: printBasicFake,
                error: errorFake
            };

            const authController = new AuthController(authServiceFake, loggerFake, inquirer);

            await authController.signup()

            expect(registerFake.firstCall.args).to.deep.equal([ email, password ]);
            expect(printBasicFake.calledOnce).to.be.true;
            expect(errorFake.called).to.be.true;
            expect(promptFake.calledOnce).to.be.true;
        });

        it('should finish the process when answer no', async () => {
            const exitSpy = sinon.spy(process, 'exit');

            const registerFake = sinon.fake.resolves(true);
            authServiceFake = {
                register: registerFake
            };

            promptFake = sinon.stub();
            promptFake.onCall(0).resolves({email, password});
            promptFake.onCall(1).resolves(false);
            inquirer = {
                prompt: promptFake
            }

            printBasicFake = sinon.fake();
            errorFake = sinon.fake();
            loggerFake = {
                printBasic: printBasicFake,
                error: errorFake
            };

            const authController = new AuthController(authServiceFake, loggerFake, inquirer);

            await authController.signup()

            // TODO: -make a better assertion for this
            expect(exitSpy.called).to.be.false;
        });
    });
});
