const validateSales = (req, res, next) => {
  const products = req.body;
  const messages = products.map((product) => {
    const { productId, quantity } = product;
    if (productId === undefined) {
      return { message: '"productId" is required' };
    }
    if (quantity === undefined) {
      return { message: '"quantity" is required' };
    }
    return null;
  }).filter((message) => message !== null);

  if (messages.length > 0) {
    return res.status(400).json(messages[0]);
  }

  return next();
};

const verifyQuantity = (req, res, next) => {
  const products = req.body;
  const errorMessages = products
    .map((product) => {
      const { quantity } = product;
      if (quantity < 1) {
        return { message: '"quantity" must be greater than or equal to 1' };
      }
      return null;
    })
    .filter((message) => message !== null);

  if (errorMessages.length > 0) {
    return res.status(422).json(errorMessages[0]);
  }

  return next();
};

module.exports = { validateSales, verifyQuantity };
