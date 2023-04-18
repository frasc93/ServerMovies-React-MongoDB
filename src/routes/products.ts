import express from "express";
import { body, param, query } from "express-validator";
import { checkErrors } from "./utils";
import { Product } from "../models/Product";
const router = express.Router();


// GET tutti i prodotti
router.get('/',
body("category").optional().isString(),
body("subcategory").optional().isString(),
body("price").optional().isNumeric(), 
body("rank").optional().isString(), 
body("reviews").optional().isString(), 
checkErrors, 
  async (req, res) => {
  const products = await Product.find();
  res.send(products);
});


// GET un prodotto in base all'id
router.get('/:id',
  param("id").isMongoId(),
  checkErrors,
  async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.json(product);
  });
  

//GET tutti i prodotti di una determinata categoria
router.get('/',
checkErrors,
  async (req, res) => {
  const product = await Product.find({ category: req.params.category });
  res.send(product);
});

// DELETE un prodotto in base all'id
router.delete('/:id',
  param("id").isMongoId(),
  checkErrors,
  async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    await Product.findByIdAndDelete(id);
    res.json({ message: "product deleted" });
  }
);

// POST un nuovo prodotto
  router.post('/',
  body("name").exists().isString(),
  body("category").exists().isString(),
  body("subcategory").exists().isString(),
  body("price").exists().isNumeric(),
  body("rank").exists().isNumeric(),
  body("reviews").exists().isString(),
  checkErrors,
  async (req, res) => {
    const { name, category, subcategory, price, rank, reviews} = req.body;
    const product = new Product({ name, category, subcategory, price, rank, reviews });
    const productSaved = await product.save();
    res.status(201).json(productSaved);
  }
);

// GET per filtrare i prodotti per costo, rank, categoria e sottocategoria
router.get('/',
query("category").isString(),
query("subcategory").exists().isString(),
query("cost").exists().isNumeric(), 
query("rank").exists().isString(), 
checkErrors,
async (req, res) => { 
  const { category, subcategory, cost, rank } = req.params;
  const product = await Product.find({ category, subcategory, cost, rank }); 
  if (!product) { 
    return res.status(404).json({ message: "product not found" });
  }
  res.json(product); 
}
);

export default router;
