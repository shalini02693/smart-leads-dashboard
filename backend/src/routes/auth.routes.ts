import express from 'express';

import {
  login,
  register,
} from '../controllers/auth.controller';

import {
  loginValidator,
  registerValidator,
} from '../validators/auth.validator';

import { validate } from '../middleware/validate.middleware';

const router = express.Router();

router.post(
  '/register',
  registerValidator,
  validate,
  register
);

router.post(
  '/login',
  loginValidator,
  validate,
  login
);

export default router;