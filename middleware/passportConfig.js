import { User } from '../models/userModels.js';
import LocalStrategy from 'passport-local';
import { catchAsynHandler } from './catchAsyncError.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import JWT from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

LocalStrategy.Strategy;

const createToken = (id) => {

    const token = JWT.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    return token;
}


const initializePassport = function (passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        catchAsynHandler(async (email, password, done) => {
            // Check if email and password are provided
            if (!email || !password) {
                return done(new errorHandler("Please enter all the required fields!", 500));
            }

            // Find the user by email
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                return done(new errorHandler("User Do Not Exist Please Register Yourself First", 400));
            }

            // Check if the user is verified
            if (!user.verified) {
                return done(new errorHandler("Account not verified!", 400));
            }

            // Validate the password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return done(new errorHandler("Invalid email or password!", 400));
            }

            // If everything is fine, generate a token (optional in Passport.js flow)
            const token = createToken(user.id);

            // Pass the user object and token to the next middleware
            return done(null, user, { token });
        })
    ));


    // passport.use(new JwtStrategy({
    //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //     secretOrKey: process.env.JWT_SECRET,
    // }, async (jwtPayload, done) => {
    //     try {
    //         const user = await User.findById(jwtPayload.id);
    //         if (user) {
    //             return done(null, user);
    //         } else {
    //             return done(null, false);
    //         }
    //     } catch (error) {
    //         return done(error, false);
    //     }
    // }));


    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};


export { initializePassport }