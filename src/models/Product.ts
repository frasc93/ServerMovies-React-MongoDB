import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  image: {type: String, required: true},
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;