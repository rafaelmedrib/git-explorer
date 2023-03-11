const chalk = require("chalk");

class Loggers {

    static error (error) {
        console.log(chalk.red.bold('ERROR: \n'), error.message);
    }

    static printBasic (msg) {
        console.log(chalk.cyan(msg))
    }
}

module.exports = {
    Loggers
};
