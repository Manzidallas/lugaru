import express from 'express';
import { createSlot, deleteSlot, getSlotById, getSlots, updateSlot } from '../controllers/parkingSlotController.js';
const router = express.Router();

router.post('/', createSlot);
router.get('/', getSlots);
router.get('/:id', getSlotById);
router.put('/:id', updateSlot);
router.delete('/:id', deleteSlot);

export default router;
