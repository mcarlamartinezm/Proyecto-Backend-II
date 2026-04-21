import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile', auth, (req, res) => {
    res.render('profile', { user: req.user });
});



export default router;