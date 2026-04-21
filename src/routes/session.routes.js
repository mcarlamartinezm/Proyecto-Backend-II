import { Router } from 'express';
import { register } from '../controllers/session.controller.js';
import { login } from '../controllers/session.controller.js';

const router = Router();

router.post('/register', register);
router.post("/login", login);

export default router;