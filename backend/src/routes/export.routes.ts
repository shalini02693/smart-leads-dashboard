import express from 'express';

import { exportCSV } from '../controllers/export.controller';

import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/csv', protect, exportCSV);

export default router;