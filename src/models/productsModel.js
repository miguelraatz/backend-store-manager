const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
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

module.exports = { getAll, getById, createProduct };
