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

module.exports = { getAll, getById, createProduct, registerSales };
