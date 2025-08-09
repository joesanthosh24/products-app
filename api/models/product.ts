import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  imageUrl: { type: String },
  isDeleted: { type: Boolean, required: true }
}, { collection: 'products' });

export default mongoose.model('Product', productSchema);
