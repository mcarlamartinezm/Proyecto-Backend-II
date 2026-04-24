import { Router } from 'express';
import { register } from '../controllers/session.controller.js';
import { login } from '../controllers/session.controller.js';
import { generateToken } from '../utils/jwt.js'
import passport from 'passport';

const router = Router();

router.post('/register', register);
router.post("/login", login);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']})
);
router.get(
  '/googlecallback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const user = req.user;

      const token = generateToken({
        id: user._id,
        email: user.email,
        role: user.role,
        first_name: user.first_name
      });

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 3600000
      });

      res.redirect('/profile');
    } catch (error) {
      res.status(500).send('Error en Google callback');
    }
  }
);

router.get('/session-user', (req, res) => {
    res.json(req.session.user || 'No hay usuario en sesión');
});

export default router;