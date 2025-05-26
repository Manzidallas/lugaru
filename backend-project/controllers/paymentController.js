import Payment from '../models/Stockout.js';

export const getDailyReport = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const payments = await Payment.find({ paymentDate: { $gte: today } }).populate('recordId');
    const report = payments.map(p => ({
      plateNumber: p.recordId.plateNumber,
      entryTime: p.recordId.entryTime,
      exitTime: p.recordId.exitTime,
      duration: p.recordId.duration,
      amountPaid: p.amountPaid
    }));

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMonthlyReport = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const payments = await Payment.find({ paymentDate: { $gte: startOfMonth } }).populate('recordId');
    const report = payments.map(p => ({
      plateNumber: p.recordId.plateNumber,
      entryTime: p.recordId.entryTime,
      exitTime: p.recordId.exitTime,
      duration: p.recordId.duration,
      amountPaid: p.amountPaid
    }));

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('recordId');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('recordId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
