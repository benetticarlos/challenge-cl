import { config } from 'dotenv';
config();

export default {
  PORT: process.env.PORT,
  SECRET_SESSION: process.env.SECRET_SESSION,
  MONGO_DB: process.env.MONGO_DB,
  MONGO_DB_TEST: process.env.MONGO_DB_TEST,
  MONGO_DB_LOCAL: process.env.MONGO_DB_LOCAL,
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};
