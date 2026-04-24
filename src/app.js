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

const app = express ();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use (cookieParser());
app.use(passport.initialize());
app.use((req, res, next) =>{
    res.locals.user = req.user || null;
    next();
});

app.use(session({
    secret: 'secretSessionKey',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge: 100 * 60 * 60}
}));

app.use('/api/session', sessionRouter);
app.use('/', viewsRouter);




//middlewares
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) =>{
    res.send ("Auth corriendo");
});

export default app;