const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const productsController = require('../../../src/controllers/productsController');
const productsService = require('../../../src/services/productsService');

describe('Products Controller Test', () => {
  describe('Test Controllers', () => {
    afterEach(() => sinon.restore());
    it('getAll data', async () => {
      sinon.stub(productsService, 'getAll').resolves([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
      ]);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
      ]);
    });
    it('getById sucess case', async () => {
      sinon.stub(productsService, 'getById').resolves({ id: 1, name: 'Martelo de Thor' });

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      req.params = sinon.stub().returns(req);

      await productsController.getById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'Martelo de Thor' });
    });
  });

});