const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const config = require('../appConfig');

const GOOGLE_CLIENT_ID = "738248577660-8u1vvjog2htncs3ahm3mr2tgp9tjvuhm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "WCrvucPZJnvWNQMQNTAvECBt";

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: config.APP_Google_Callback,
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});
