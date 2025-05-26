import express from 'express';
import { carEntry, carExit, getRecordById, getRecords, getRecordsByPlateNumber } from '../controllers/parkingRecordController.js';
const router = express.Router();

router.post('/entry', carEntry);
router.put('/exit/:id', carExit);
router.get('/', getRecords);
router.get('/:id', getRecordById);
router.get('/plate/:plateNumber', getRecordsByPlateNumber);

export default router;
