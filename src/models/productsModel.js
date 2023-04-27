const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id;');
  return products;
};

const getById = async (id) => {
  const [[product]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
  return product;
};

const createProduct = async ({ name }) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?);', [name]);

  return { id: insertId, name };
};

const insertDateSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const registerSales = async (idSale, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [idSale, productId, quantity],
  );

  return insertId;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT *
      FROM StoreManager.sales_products
      INNER JOIN StoreManager.sales ON sales_products.sale_id = sales.id
      ORDER BY sale_id, product_id;`,
  );
  return camelize(result);
};

const getSalesById = async (idSale) => {
  const [result] = await connection.execute(
    `SELECT date, product_id AS productId, quantity
      FROM StoreManager.sales
      INNER JOIN StoreManager.sales_products ON sales_products.sale_id = sales.id
      WHERE sales.id = ?;`,
      [idSale],
  );
  return camelize(result);
};

module.exports = {
  getAll,
  getById,
  createProduct,
  registerSales,
  insertDateSales,
  getAllSales,
  getSalesById,
};
