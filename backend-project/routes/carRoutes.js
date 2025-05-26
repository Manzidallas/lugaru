import express from 'express';
import { createCar, getCarById, getCars, getCarsByUser } from '../controllers/carController.js';
const router = express.Router();

router.post('/', createCar);
router.get('/', getCars);
router.get('/:id', getCarById);
router.get('/user/:userId', getCarsByUser);


export default router;
