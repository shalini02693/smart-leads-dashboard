import express from 'express';
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
} from '../controllers/lead.controller';

import { protect } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';
import { createLeadValidator } from '../validators/lead.validator';
import { validate } from '../middleware/validate.middleware';
const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getLeads)
  .post(
    authorizeRoles('admin'),
    createLeadValidator,
    validate,
    createLead
  );

router.route('/:id')
  .get(getLeadById)
  .put(authorizeRoles('admin'), updateLead)
  .delete(authorizeRoles('admin'), deleteLead);

export default router;