import ParkingSlot from '../models/Stockin.js';

export const createSlot = async (req, res) => {
  try {
    const slot = new ParkingSlot(req.body);
    await slot.save();
    res.status(201).json(slot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSlotById = async (req, res) => {
  try {
    const slot = await ParkingSlot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }
    res.status(200).json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSlot = async (req, res) => {
  try {
    const slot = await ParkingSlot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!slot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }
    res.status(200).json(slot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSlot = async (req, res) => {
  try {
    const slot = await ParkingSlot.findByIdAndDelete(req.params.id);
    if (!slot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }
    res.status(200).json({ message: 'Parking slot deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
