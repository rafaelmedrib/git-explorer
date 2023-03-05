const sqlite = require('../../src/repositories/sqlite');
const { expect } = require('chai');

describe('SQLite', function () {
    it('should initiate a SQLite connection', function () {
        return sqlite
            .authenticate()
            .then(() => {
                expect(true).to.be.true;
            })
            .catch(reason => {
                expect.fail(reason);
            });
    });
});
