const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models/users.model');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',

}, function (email, password, done) {
    User.findOne({ where: {email: email}}).then(function (user) {
        if (!user || !user.validatePassword(password)) {
            return done(null, false, {errors: {'user or email': 'is incorrect'}})
        }
        return done(null, user);
    }).catch(done)
}));

module.exports = passport;