import User from '../models/user.js';
import config from '../config/config.js';

const addAdmin = async () => {
  if (config.ADMIN_EMAIL && config.ADMIN_PASSWORD) {
    const user = await User.findOne({ email: config.ADMIN_EMAIL });
    if (!user) {
      const newUser = new User({
        name: config.ADMIN_NAME,
        email: config.ADMIN_EMAIL,
        admin: true,
      });
      newUser.password = await newUser.encryptPassword(config.ADMIN_PASSWORD);
      await newUser.save();
      console.log('user created :>> ', newUser);
    }
  }
};

export default addAdmin;
