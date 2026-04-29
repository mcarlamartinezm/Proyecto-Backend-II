import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserModel } from '../models/user.model.js';


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/session/googlecallback'
        }, 
        async (accessToken, refreshToken, profile, done) =>{
            try{
                const email = profile.emails[0].value;

                let user = await UserModel.findOne({email});

                if (!user){
                    user = await UserModel.create({
                        first_name: profile.name.givenName,
                        last_name: profile.name.familyName,
                        email,
                        password: 'oauth',
                    });
                }
                return done(null, user); //usuario identificado
            }catch (error){
                return done(error);
            }
        }
    )
);

export default passport;