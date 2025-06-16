const carts = require('../models/cartData');

exports.addToCart = (req, res) => {
  const userId = req.params.userId
  const { productId, name, price, qty } = req.body;

  if (!productId || !name || !price || !qty) {
    return res.status(400).json({ message: "Field tidak lengkap" });
  } 
  
  if (!carts[userId]) {
    carts[userId] = []
  }

  const existingItem = carts[userId].find(item => item.productId === productId)

  if (existingItem) {
    existingItem.qty += qty
  } else {
    carts[userId].push({ productId, name, price, qty });
  }

  res.json({ message: "Item ditambahkan ke cart", cart: carts[userId] });
}

exports.getCart = (req, res) => {
  const userId = req.params.userId
  const cart = carts[userId] 
}