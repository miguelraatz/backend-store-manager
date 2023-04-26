const productsModel = require('../models/productsModel');

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

module.exports = { getAll, getById, createProduct };
