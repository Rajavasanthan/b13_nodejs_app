const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const MongoClient = mongodb.MongoClient;
const app = express();

const URL = "mongodb://localhost:27017/fsd13";
mongoose.connect(URL);

const ProductSchema = new mongoose.Schema({
  title: String,
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

console.log("Mongoose Connected");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

let products = [];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/product", async (req, res) => {
  try {
    let product = new Product({
      title: req.body.title,
      price: req.body.price,
    });

    await product.save();
    res.json({ message: "Product Added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Validation Error" });
  }

  // /** Step 1 Connect MongoDB
  //  *  Step 2 Select Data Base
  //  *  Step 3 Select Collection
  //  *  Step 4 Insert the Data
  //  *  Step 5 Close the Connection
  //  */

  // // Step 1 Connect MongoDB
  // const connection = await MongoClient.connect(URL);

  // // Step 2 Select Data Base
  // const db = connection.db(DB_NAME);

  // // Step 3 Select Collection
  // const collection = db.collection("products");

  // // Step 4 Insert the Data
  // await collection.insertOne(req.body);

  // // Step 5 Close the connection
  // await connection.close();
});

app.get("/product/:id", (req, res) => {
  let productId = req.params.id;
  let product = products.find((product) => product.id == productId);
  if (product) {
    res.json(product);
  } else {
    res.json({ message: "Product not found" });
  }
});

app.put("/product/:id", (req, res) => {
  let index = products.findIndex((product) => product.id == req.params.id);
  products[index] = req.body;
  res.json({ message: "Product Updated Successfully" });
});

app.delete("/product/:id", (req, res) => {
  let index = products.findIndex((product) => product.id == req.params.id);
  if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: "Product Deleted Successfully" });
  } else {
    res.json({
      message: "Product not found",
    });
  }
});

app.listen(3000);
