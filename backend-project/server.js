import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import authRoutes from './routes/auth.js';
import carRoutes from './routes/carRoutes.js';
import slotRoutes from './routes/parkingSlotRoutes.js';
import recordRoutes from './routes/parkingRecordRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import SparePart from './models/Sparepart.js';
import StockIn from './models/Stockin.js';
import StockOut from './models/Stockout.js';
import Report from './models/Report.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const mongoUrl = process.env.MONGO_URI || 'mongodb://localhost:27017/parking-system';
const sessionSecret = process.env.SESSION_SECRET;
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: connectMongo.create({ mongoUrl }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false 
  }
}));

mongoose.connect(mongoUrl)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/slots', slotRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/payments', paymentRoutes);

// ROUTES

// SparePart routes
app.post('/api/spareparts', async (req, res) => {
  try {
    const part = new SparePart(req.body);
    await part.save();
    res.status(201).json(part);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/spareparts', async (req, res) => {
  const parts = await SparePart.find();
  res.json(parts);
});

app.get('/api/spareparts/:id', async (req, res) => {
  try {
    const part = await SparePart.findById(req.params.id);
    res.json(part);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/spareparts/:id', async (req, res) => {
  try {
    const updated = await SparePart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/spareparts/:id', async (req, res) => {
  try {
    await SparePart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// StockIn routes
app.post('/api/stockin', async (req, res) => {
  try {
    const stock = new StockIn(req.body);
    await stock.save();

    const spare = await SparePart.findById(stock.sparePartId);
    const report = new Report({
      title: `Stock In - ${spare.name}`,
      description: `Stocked in ${stock.quantity} unit(s) of ${spare.name}.`,
      date: stock.date
    });
    await report.save();

    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stockin', async (req, res) => {
  const stockIn = await StockIn.find().populate('sparePartId');
  res.json(stockIn);
});

app.get('/api/stockin/:id', async (req, res) => {
  try {
    const stock = await StockIn.findById(req.params.id).populate('sparePartId');
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/stockin/:id', async (req, res) => {
  try {
    const updated = await StockIn.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/stockin/:id', async (req, res) => {
  try {
    await StockIn.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// StockOut routes
app.post('/api/stockout', async (req, res) => {
  try {
    const stock = new StockOut(req.body);
    await stock.save();

    const spare = await SparePart.findById(stock.sparePartId);
    const report = new Report({
      title: `Stock Out - ${spare.name}`,
      description: `Stocked out ${stock.quantity} unit(s) of ${spare.name}.`,
      date: stock.date
    });
    await report.save();

    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stockout', async (req, res) => {
  const stockOut = await StockOut.find().populate('sparePartId');
  res.json(stockOut);
});

app.get('/api/stockout/:id', async (req, res) => {
  try {
    const stock = await StockOut.findById(req.params.id).populate('sparePartId');
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/stockout/:id', async (req, res) => {
  try {
    const updated = await StockOut.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/stockout/:id', async (req, res) => {
  try {
    await StockOut.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Report routes
app.post('/api/reports', async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/reports', async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
});

app.get('/api/reports/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/reports/:id', async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/reports/:id', async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
