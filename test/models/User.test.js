const { expect } = require('chai');
const sqlite = require('../../src/repositories/sqlite');
const { User } = require('../../src/models/User');

describe('Teste da definição do modelo User', () => {
    it('Deve definir o modelo User corretamente', () => {
        const attributes = User.rawAttributes;

        expect(attributes.id.type.key).to.equal('UUID');
        expect(attributes.id.primaryKey).to.be.true;
        expect(attributes.email.type.key).to.equal('STRING');
        expect(attributes.email.allowNull).to.be.false;
        expect(attributes.favorites.type.key).to.equal('UUID');
        expect(attributes.favorites.allowNull).to.be.true;
        expect(attributes.favorites.unique).to.be.true;
    });
});
