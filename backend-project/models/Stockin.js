import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const StockIn = model('StockIn', new Schema({
  sparePartId: { type: Schema.Types.ObjectId, ref: 'SparePart' },
  quantity: Number,
  date: Date
}));

export default StockIn;