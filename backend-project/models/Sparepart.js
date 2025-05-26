import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const SparePart = model('SparePart', new Schema({
  name: String,
  category: String,
  quantity: Number,
  unitPrice: Number,
  totalPrice: Number
}));

export default SparePart;
