import ParkingRecord from '../models/Report.js';
import ParkingSlot from '../models/Stockin.js';
import Payment from '../models/Stockout.js';

export const carEntry = async (req, res) => {
  try {
    const { plateNumber, slotNumber } = req.body;
    const record = new ParkingRecord({ plateNumber, slotNumber });
    await record.save();

    await ParkingSlot.updateOne({ slotNumber }, { slotStatus: 'Occupied' });

    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const carExit = async (req, res) => {
  try {
    const record = await ParkingRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    if (record.exitTime) return res.status(400).json({ message: "Already exited" });

    const exitTime = new Date();
    const entryTime = new Date(record.entryTime);
    
    // Calculate duration in minutes first
    const durationInMinutes = Math.ceil((exitTime - entryTime) / (1000 * 60));
    
    // Convert minutes to hours (rounding up to nearest hour)
    const durationInHours = Math.ceil(durationInMinutes / 60);
    
    // Calculate amount based on hourly rate of 500
    const amountPaid = durationInHours * 500;

    record.exitTime = exitTime;
    record.duration = durationInHours;
    record.durationInMinutes = durationInMinutes; // Store minutes for reference
    await record.save();

    const payment = new Payment({ 
      recordId: record._id, 
      amountPaid,
      durationInMinutes,
      durationInHours 
    });
    await payment.save();

    await ParkingSlot.updateOne({ slotNumber: record.slotNumber }, { slotStatus: 'Available' });

    res.json({ record, payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getRecords = async (req, res) => {
  try {
    const records = await ParkingRecord.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecordById = async (req, res) => {
  try {
    const record = await ParkingRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Parking record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecordsByPlateNumber = async (req, res) => {
  try {
    const records = await ParkingRecord.find({ plateNumber: req.params.plateNumber });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
