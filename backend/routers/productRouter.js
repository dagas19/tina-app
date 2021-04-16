import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  }),
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  }),
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  }),
);

productRouter.post(
  "/newproduct",
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      price: req.body.price,
      countInStock: req.body.countInStock,
      brand: req.body.brand,
      description: req.body.description,
    });
    const createdproduct = await product.save();
    res.send({
      _id: createdproduct._id,
      name: createdproduct.name,
      image: createdproduct.image,
      category: createdproduct.category,
      price: createdproduct.price,
      countInStock: createdproduct.countInStock,
      brand: createdproduct.brand,
      description: createdproduct.description,
    });
  }),
);

export default productRouter;
