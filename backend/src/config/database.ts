import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_NAME = process.env.DB_NAME || 'blog';

// Create Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
  },
  // 设置时区为东八区（UTC+8），确保所有时间都按照东八区处理
  timezone: '+08:00',
  dialectOptions: {
    // 确保MySQL连接使用东八区时间
    dateStrings: true,
    typeCast: true,
    timezone: '+08:00',
  },
});

// Connect to database
const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected');
    // Sync models with database, alter: true will update table structure without dropping data
    await sequelize.sync({ alter: true });
    console.log('Database synced');
    console.log('Table structure updated if needed');
  } catch (error) {
    console.error(`Error connecting to MySQL: ${error}`);
    // Don't exit process, just log error
    console.log('MySQL connection failed, server will continue running without database');
  }
};

export { sequelize, connectDB };