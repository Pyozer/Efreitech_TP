import passport from 'passport'
import { Strategy } from 'passport-local'
import { Strategy as StrategyJWT, ExtractJwt } from 'passport-jwt'
import User from '../models/user';

passport.use(new Strategy({
    usernameField: 'nickname',
    passwordField: 'password'
}, async (nickname, password, next) => {
    try {
        const user = await User.findOne({ nickname })

        if (!user)
            return next('Incorrect email or password.')

        if (!await user.checkPassword(password))
            return next('Password incorrect')

        return next(null, user)
    } catch (err) {
        return next(err.message)
    }
}));

passport.use(new StrategyJWT({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ENCRYPTION
}, async (jwtPayload, next) => {
    try {
        const user = await User.findOne({ where: { uuid: jwtPayload.uuid }})

        if (!user)
            return next("User doesn't exists.")
        
        return next('Password incorrect')
    } catch (err) {
        return next(err.message)
    }
}));