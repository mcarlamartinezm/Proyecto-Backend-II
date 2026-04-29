import { Router } from 'express';
import { register } from '../controllers/session.controller.js';
import { login } from '../controllers/session.controller.js';
import { generateToken } from '../utils/jwt.js'
import passport from 'passport';

const router = Router();

router.post('/register', register); //registrar nuevo usuario
router.post("/login", login); //validar credenciales y generar JWT
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']})
); //redirección de google, pide acceso a perfil y mail de usuario.
router.get(
  '/googlecallback', //callback desde google
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const user = req.user; //usuario autenticado por google

      const token = generateToken({ //generación del JWT con datos relevantes
        id: user._id,
        email: user.email,
        role: user.role,
        first_name: user.first_name
      });

      res.cookie('token', token, { //guarda el token en una cookie segura
        httpOnly: true, //no accesible desde js (seguridad)
        sameSite: 'lax', //Protección CSRF básica
        secure: false, //true en profuccipon con HTTPS
        maxAge: 60 * 60 * 1000, // 1 hora
        path: '/' 
      });

      res.redirect('/profile'); //redirección a vista protegida
    } catch (error) { //manejo de error si falla el callback
      res.status(500).send('Error en Google callback');
    }
  }
);

//test para verificar si existe el usuario en session
router.get('/session-user', (req, res) => {
    res.json(req.session.user || 'No hay usuario en sesión');
});


//==== Eliminación de la cookie y cerrar sesión
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true, //no accesible desde JS
    secure: false, //true en produccion HTTPS
    sameSite: 'strict', //protección CSRF básica
    maxAge: 100 * 60 * 60, // 1 hora
    path: '/' //disponible en toda la app
  });
  res.send({ status: "success", message: "logout realizado correctamente"})
}); //respuesta de confirmación de eliminación

export default router;