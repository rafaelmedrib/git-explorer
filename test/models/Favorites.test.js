const { expect } = require('chai');

const { Favorites } = require('../../src/models/Favorites');

describe('Favorites', () => {
    it('should implement the Favorites model properly', () => {
        const attributes = Favorites.rawAttributes;

        expect(attributes.id.type.key).to.equal('UUID');
        expect(attributes.id.primaryKey).to.be.true;
        expect(attributes.urls.type.key).to.equal('ARRAY');
    });
});
