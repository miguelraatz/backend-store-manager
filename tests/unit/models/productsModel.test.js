const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');

const { getAllMockProducts, getByIdMockProduct } = require('../mock/products.mock');

describe('Products Model Tests', () => {
  describe('Sucess case', () => {
    afterEach(() => sinon.restore());
    it('GetAll with data', async () => {
      sinon.stub(connection, 'execute').resolves([getAllMockProducts]);

      const result = await productsModel.getAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
      expect(result[0]).to.contain.keys(['id', 'name']);
    });
    it('GetById with data', async () => {
      sinon.stub(connection, 'execute').resolves([getByIdMockProduct]);

      const result = await productsModel.getById(1);

      expect(result).to.be.an('object');
      expect(result).to.be.keys(['id', 'name']);
    });
  });
});