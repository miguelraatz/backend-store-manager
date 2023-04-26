const { expect } = require("chai");
const sinon = require("sinon");

const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');

describe('Products Service Test', () => {
  describe('Sucess case', () => {
    afterEach(() => sinon.restore());
    it('getAll datas', async () => {
      sinon.stub(productsModel, 'getAll').resolves([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' }
      ]);

      const result = await productsService.getAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
    });
    it('getById sucess case', async () => {
      sinon.stub(productsModel, 'getById').resolves({ id: 1, name: 'Martelo de Thor' });

      const result = await productsService.getById(1);

      expect(result).to.contain.keys(['id', 'name']);
    });
  });
});