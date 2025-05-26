import express from 'express';
import { getDailyReport, getMonthlyReport, getPaymentById } from '../controllers/paymentController.js';
const router = express.Router();

router.get('/daily', getDailyReport);
router.get('/monthly', getMonthlyReport);
router.get('/:id', getPaymentById);

export default router;
