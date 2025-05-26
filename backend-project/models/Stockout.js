import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const StockOut = model('StockOut', new Schema({
  sparePartId: { type: Schema.Types.ObjectId, ref: 'SparePart' },
  quantity: Number,
  unitPrice: Number,
  totalPrice: Number,
  date: Date
}));

export default StockOut;