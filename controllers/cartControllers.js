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
  const cart = carts[userId] || []
  
  res.json({cart})
}

exports.updateQty = (req, res) => {
  const userId = req.params.userId
  const {productId, qty} = req.body

  if (!productId || typeof qty !== Number) {
    return res.status(400).json({message: "Incomplete field data or type missmatch"})
  }

  const cart = carts[userId]
  if (!cart) {
    return res.status(404).json({message: "Cart not found"})
  }

  const item = cart.find(item => item.productId === productId)
  if (!item) {
    return res.status(404).json({message: "Product not found"})
  }

  if (qty <= 0) {
    carts[userId] = cart.filter(item => item.productId !== productId)
  } else {
    item.qty = qty;
  }

  res.json({ message: "Cart updated", cart: carts[userId] });
}

exports.deleteItem = (req, res) => {
  const userId = req.params.userId
  const productId = req.params.productId

  const cart = carts[userId]
  if (!cart) {
    return res.status(404).json({message: "Cart not found"})
  }

  carts[userId] = cart.filter((item) => item.productId !== productId);

  res.json({message: `deleted item ${productId} from ${carts[userId]}`})
}