import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../models/User.model.js';
import { isValidPassword } from '../utils/hash.js';

//inicializa la estrategia local de passport (autenticacióncon email y contraseña)
export const initializeLocalStrategy = () => {
  passport.use(
    'local', //nombre de la esrtategia
    new LocalStrategy(
      {
        usernameField: 'email', //se define email como identificador en lugar de username
        passwordField: 'password'
      },
      async (email, password, done) => {
        try { //Búsqueda del usuario en la base de datos
          const user = await UserModel.findOne({ email });

          if (!user) { //Usuario no encontrado
            return done(null, false, { message: 'Usuario no encontrado' });
          }

          if (!isValidPassword(user, password)) { 
            return done(null, false, { message: 'Contraseña incorrecta' }); //validación de contraseña utilizando bcrypt
          }

          return done(null, user); //Usuario autenticado correctamente
        } catch (error) {
          return done(error); //manejo de errores
        }
      }
    )
  );
};