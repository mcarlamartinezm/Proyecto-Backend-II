import jwt from 'jsonwebtoken';

// middleware de autenticación con JWT, validación de existencia y validez del token almacenado en cookies

export const auth = (req, res, next) => { 
    const token = req.cookies.token; //obtiene el token desde la cookie httpOnly


    if (!token){ //si no existe -> usuario no autenticado
        return res.redirect('/login');
    }
    try { //verifica el token con clave secreta
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; //adjunta información del usuario al Request
        next(); //permite continuar a ruta protegida
    } catch (error) { //error si token es inválido o exppirado
        return res.redirect('/login');
    }
};


//Middleware de autenticación con AuthSession, verifica si existe usuario almacenado en la sesión del servidor

export const authSession = (req, res, next) =>{
    if (!req.session.user) {
        return res.status(401).send('Sesión no autorizada (session)'); //error si la sessión no es autorizada
    }
    next(); //Continúa con usuario identificado vía session.
};