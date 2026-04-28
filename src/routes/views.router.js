import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { auth } from '../middlewares/auth.middleware.js'; //principal
import { authorize } from '../middlewares/role.middleware.js';
//import { authorize } from 'passport'; //implementación auth sin rol
//import { authSession } from '../middlewares/auth.middleware.js'; //implementacion de Authsession

const router = Router();

router.get('/login', (req, res) => {
    res.render('login');
});

//====== Auth -no activado
 /*router.get('/profile', auth, (req, res) => { res.render('profile', { user: req.user }); 
 });*/


//===== AuthSession - no activado
/*router.get('/profile', authSession, (req, res) => {
    res.render('profile', { user: req.session.user });
});*/


//====== Auth + roles (JWT)
router.get('/profile', auth, authorize ('user', 'admin'), //valida login con JWT
(req, res) => {
    res.render('profile', { user: req.user});
});


//Validación solo para administradores
router.get('/admin', auth, authorize('admin'), (req, res) => { 
    res.send('Panel de administrador');
}
);




export default router;