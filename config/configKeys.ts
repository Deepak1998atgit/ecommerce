import dotenv from 'dotenv';
dotenv.config();

const configKeys = {

  PORT: process.env.PORT,

  DB_NAME: process.env.DB_NAME, 

  JWT_SECRET: process.env.JWT_SECRET as string,


};

export default configKeys;