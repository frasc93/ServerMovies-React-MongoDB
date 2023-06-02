import mongoose from "mongoose";
import Product from "./models/Product";
import { Movies } from "./data";

const dbName = "MoviesDB";

const dbData = async () => {

    await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
    await Product.deleteMany({});

    try{
        await Product.insertMany(Movies);
        console.log("Data imported successfully");
    } catch (error) {
        console.error("Error importing data:", error);
    }
}
export default dbData;