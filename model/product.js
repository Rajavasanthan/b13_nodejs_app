const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  title: String,
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = {Product}