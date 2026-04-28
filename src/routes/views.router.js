import { Router } from 'express';
import jwt from 'jsonwebtoken';
//import { auth } from '../middlewares/auth.middleware.js';
import { authSession } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

//====== Auth
/*router.get('/profile', auth, (req, res) => {
    res.render('profile', { user: req.user });
});*/

//===== AuthSession
router.get('/profile', authSession, (req, res) => {
    res.render('profile', { user: req.session.user });
});



export default router;