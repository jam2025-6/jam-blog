import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jam-blogs',
  pool: {
    max: parseInt(process.env.DB_CONNECTION_LIMIT || '10'),
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  models: [__dirname + '/../models/**/*'],
  logging: console.log,
  timezone: '+08:00'
});

// 测试数据库连接
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;