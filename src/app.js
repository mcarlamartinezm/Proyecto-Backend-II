import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sessionRouter from './routes/session.routes.js'
import handlebars from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import viewsRouter from './routes/views.router.js';
import passport from "passport";
import session from "express-session";
import './strategies/google.strategy.js';

const app = express (); //Inicialización de la aplicación ES Module 
const __filename = fileURLToPath(import.meta.url); //permite obtener _dirname, rutas absolutas
const __dirname = path.dirname(__filename);


//middleware base
app.use(express.json()); //parseo de JSON
app.use(express.urlencoded({ extended: true })); //parseo de formular
app.use(cors()); //habilita CORS
app.use (cookieParser()); //lectura de cookies para JWT
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(passport.initialize()); //inicialización de Passport

//Inyección de usuario en vistas (JWT), permite usar {{user}} en Handlebars desde req.user. Se debe activar.
/*app.use((req, res, next) =>{
    res.locals.user = req.user || null;
    next();
});*/

//almacenamiento del usuario en el servidor, como implementación alternativa a JWT
app.use(session({
    secret: 'secretSessionKey',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge: 100 * 60 * 60}
}));

//Rutas principales
app.use('/api/session', sessionRouter);
app.use('/', viewsRouter);


//Confirguración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//Ruta de base de prueba
app.get("/", (req, res) =>{
    res.send ("Auth corriendo");
});

export default app;