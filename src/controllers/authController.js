const { SIGNUP_MESSAGE } = require("../views/arts");

class AuthController {
    constructor( authService, logger, prompter) {
        this.authService = authService;
        this.response = false;
        this.error = logger.error;
        this.printBasic = logger.printBasic;
        this.prompter = prompter;
    }

    async signup() {
        console.clear();
        this.printBasic('Sign Up to Git Explorer');
        const { email, password } = await this.prompter.prompt([
            {
                type: 'input',
                name: 'email',
                message: 'Email:\n'
            },
            {
                type: 'password',
                name: 'password',
                message: 'Password:\n'
            },
            {
                type: 'password',
                name: 'passwordConfirmation',
                message: 'Confirm your password:\n'
            },
        ])

        try {
            this.response = await this.authService.register(email, password);
            console.clear();
            this.printBasic(SIGNUP_MESSAGE);
        } catch (e) {
            this.error(e.message);
            return false;
        }

        if (await this.prompter.prompt([{
            type: 'confirm',
            name: 'return home',
            message: 'Signup Completed. Press \'Enter\' to return to home...',
            default: true
        }])) {
            return this.response;
        }
    }
}

module.exports = {
    AuthController
}
