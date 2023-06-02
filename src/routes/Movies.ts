import express from "express";
import { body, param, query } from "express-validator";
import { checkErrors } from "./utils";
import Product  from "../models/Product";

const router = express.Router();


// GET tutti i prodotti
router.get('/allmovies',
body("image").optional().isString(),
body("title").optional().isString(),
body("genre").optional().isString(), 
body("description").optional().isString(), 
checkErrors, 
  async (req, res) => {
  const products = await Product.find();
  res.send(products);
});


// GET un prodotto in base alla category
router.get('/genre/:genre',
  param("genre").isString().notEmpty(),
  checkErrors,
  async (req, res) => {
    const { genre } = req.params;
    const product = await Product.find({genre});
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.json(product);
  });
  


export default router;
