const productsModel = require('../models/productsModel');

const verifyProductId = (allProducts, arrayBody) =>
  arrayBody.every((item) =>
    allProducts.some((produto) => item.productId === produto.id));

const insertedSales = async (arrayBody, insertId) => {
  await Promise.all(
    arrayBody.map(async (elem) => {
      const { productId, quantity } = elem;
      await productsModel.registerSales(
        insertId,
        productId,
        quantity,
      );
    }),
  );
  return {
    id: insertId,
    itemsSold: arrayBody,
  };
};

module.exports = { insertedSales, verifyProductId };
