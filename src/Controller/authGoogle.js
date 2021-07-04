const passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = "738248577660-8u1vvjog2htncs3ahm3mr2tgp9tjvuhm.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "WCrvucPZJnvWNQMQNTAvECBt";

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, profile, done) {
    // console.log(profile);

    return done(null, profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});
