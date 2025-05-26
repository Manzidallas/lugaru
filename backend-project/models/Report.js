import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Report = model('Report', new Schema({
  title: String,
  description: String,
  date: Date
}));

export default Report;