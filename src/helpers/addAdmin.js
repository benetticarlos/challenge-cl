import User from '../models/user.js';
import config from '../config/config.js';

const addAdmin = async () => {
  const user = await User.findOne({ email: config.ADMIN_EMAIL });
  if (!user) {
    const newUser = new User({
      name: config.ADMIN_NAME,
      email: config.ADMIN_EMAIL,
      password: config.ADMIN_PASSWORD,
      admin: true,
    });
    await newUser.save();
    console.log('user created :>> ', newUser);
  }
};

export default addAdmin;
