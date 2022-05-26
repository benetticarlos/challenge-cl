import passport from 'passport';
import User from '../models/user.js';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        // Match Email's User
        const user = await User.findOne({ email: email });

        if (!user) {
          return done(null, false, { message: 'Not User found.' });
        } else {
          // Match Password's User
          const match = await user.matchPassword(password);
          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect Password.' });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
