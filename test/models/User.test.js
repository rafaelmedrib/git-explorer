const { expect } = require('chai');

const { User } = require('../../src/models/User');

describe('User', () => {
    it('should implement the User model properly', () => {
        const attributes = User.rawAttributes;

        expect(attributes.id.type.key).to.equal('UUID');
        expect(attributes.id.primaryKey).to.be.true;
        expect(attributes.id.defaultValue).to.exist;
        expect(attributes.email.type.key).to.equal('STRING');
        expect(attributes.email.allowNull).to.be.false;
        expect(attributes.favorites.type.key).to.equal('UUID');
        expect(attributes.favorites.defaultValue).to.exist;
        expect(attributes.password.type.key).to.equal('STRING');
        expect(attributes.password.allowNull).to.be.false;
    });
});
