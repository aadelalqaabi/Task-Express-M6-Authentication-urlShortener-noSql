const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    let isMatch = true;
    if (user) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = false;
    }
    if (isMatch) return done(null, user);
    else return done(null, false);
  } catch (error) {
    done(error);
  }
});
