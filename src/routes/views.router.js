import { Router } from 'express';
import { auth } from '../middlewares/auth.middleware.js'; //principal
import { authorize } from '../middlewares/role.middleware.js';
//import { authorize } from 'passport'; //implementación auth sin rol
//import { authSession } from '../middlewares/auth.middleware.js'; //implementacion de Authsession

const router = Router();

router.get('/login', (req, res) => {
    const success = req.query.success;
    res.render('login', { success });
});

router.get('/register', (req, res) => {
    res.render('register');
});

//====== Auth -no activado-
 /*router.get('/profile', auth, (req, res) => { res.render('profile', { user: req.user }); 
 });*/


//===== AuthSession  -no activado-
/*router.get('/profile', authSession, (req, res) => {
    res.render('profile', { user: req.session.user });
});*/


//====== Auth + roles, Ruta protegida con JWT y control de acceso por roles (RBAC)
router.get('/profile', auth, authorize('user', 'admin'), //valida autenticación mediante JWT y autorización por rol
(req, res) => {
    res.render('profile', { user: req.user});
});


//Validación solo para rol de administradores
router.get('/admin', auth, authorize('admin'), (req, res) => { 
    res.send('Panel de administrador');
}
);


export default router;