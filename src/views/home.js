const chalk = require("chalk");
const { GIT_EXPLORER_LOGO } = require("./arts");

const printHome = () => {
    console.clear();
    console.log(chalk.dim('*'.repeat(60)));
    console.log(chalk.green.bold(GIT_EXPLORER_LOGO));
    console.log(chalk.dim('*'.repeat(60)));
}

module.exports = {
    printHome
}
