const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getById(id);
  if (result.type) return res.status(result.type).json({ message: result.message });
  return res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const product = req.body;
  const result = await productsService.createProduct(product);
  return res.status(201).json(result.message);
};

const registerSales = async (req, res) => {
  const product = req.body;
  const { type, statusCode, message } = await productsService.registerSales(product);
  if (type === 'ERROR') {
    return res.status(statusCode).json({ message: 'Product not found' });
  }
  return res.status(statusCode).json(message);
};

const getAllSales = async (_req, res) => {
  const { type, statusCode, message } = await productsService.getAllSales();
  if (type === 'ERROR') {
    return res.status(statusCode).json({ message: 'Sale not found' });
  }
  return res.status(statusCode).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, statusCode, message } = await productsService.getSalesById(id);
  if (type === 'ERROR') {
    return res.status(statusCode).json({ message: 'Sale not found' });
  }
  return res.status(statusCode).json(message);
};

const editedProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productsService.editedProduct(id, name);
  if (product.type) {
    return res.status(product.statusCode).json({ message: product.message });
  }
  return res.status(product.statusCode).json(product.newName);
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