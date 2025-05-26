import Car from '../models/Sparepart.js';

export const createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarsByUser = async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.params.userId });
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
