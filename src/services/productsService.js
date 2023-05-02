const productsModel = require('../models/productsModel');
const { insertedSales, verifyProductId } = require('../helpers/functions');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { type: 404, message: 'Product not found' };
  return product;
};

const createProduct = async (product) => {
  const createdProduct = await productsModel.createProduct(product);
  return { message: createdProduct };
};

const registerSales = async (body) => {
  const products = await productsModel.getAll();
  const verify = verifyProductId(products, body);

  if (!verify) {
    return { type: 'ERROR', statusCode: 404 };
  }
  
  const insertId = await productsModel.insertDateSales();
  const insert = await insertedSales(body, insertId);
  return { type: 'SUCCESS', statusCode: 201, message: insert };
};

const getAllSales = async () => {
  const sales = await productsModel.getAllSales();
  return { type: 'SUCESS', statusCode: 200, message: sales };
};

const getSalesById = async (idSale) => {
  const sale = await productsModel.getSalesById(idSale);
  if (sale.length === 0) {
    return { type: 'ERROR', statusCode: 404 };
  }
  return { type: 'SUCESS', statusCode: 200, message: sale };
};

const editedProduct = async (id, name) => {
  const result = await productsModel.editedProduct(id, name);
  if (!result) {
    return { type: 'ERROR', statusCode: 404, message: 'Product not found' };
  }
  return { type: null, statusCode: 200, newName: { id, name } };
};

module.exports = {
  getAll,
  getById,
  createProduct,
  registerSales,
  getAllSales,
  getSalesById,
  editedProduct,
};
