import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// 加载环境变量
// 测试脚本使用单独的配置文件，避免影响开发环境
const envFile = '.env.test';
dotenv.config({ path: envFile });

// 数据库配置
const DB_CONFIG = {
  host: process.env.DB_URL || process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'jam-blogs',
  dialect: 'mysql',
  timezone: '+08:00',
  logging: true,
};

console.log('Testing database connection with configuration:');
console.log(`Host: ${DB_CONFIG.host}`);
console.log(`Port: ${DB_CONFIG.port}`);
console.log(`User: ${DB_CONFIG.user}`);
console.log(`Database: ${DB_CONFIG.database}`);
console.log('Password: [hidden]');
console.log('');

// 创建 Sequelize 实例
// 注意：validateConfig() 会确保这些值不是 undefined
const sequelize = new Sequelize(
  DB_CONFIG.database as string,
  DB_CONFIG.user as string,
  DB_CONFIG.password as string,
  {
    dialect: DB_CONFIG.dialect as any,
    host: DB_CONFIG.host as string,
    port: DB_CONFIG.port,
    logging: DB_CONFIG.logging,
    timezone: DB_CONFIG.timezone,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
      timezone: DB_CONFIG.timezone,
    },
  }
);

// 验证配置
function validateConfig() {
  const requiredFields = ['user', 'password', 'database', 'host'];
  const missingFields = requiredFields.filter(field => !DB_CONFIG[field as keyof typeof DB_CONFIG]);

  if (missingFields.length > 0) {
    console.error('❌ Missing required database configuration:');
    missingFields.forEach(field => {
      console.error(`  - ${field}`);
    });
    console.error('');
    console.error('Please check your .env.test file and ensure all required fields are set.');
    process.exit(1);
  }
}

// 测试连接
async function testConnection() {
  try {
    // 验证配置
    validateConfig();

    console.log('Attempting to connect to database...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');

    // 测试查询
    console.log('Testing simple query...');
    const [results] = await sequelize.query('SELECT 1+1 AS result');
    console.log(`✅ Query successful! Result: ${JSON.stringify(results)}`);

    // 获取数据库版本
    const [versionResults] = await sequelize.query('SELECT VERSION() AS version');
    console.log(`✅ Database version: ${JSON.stringify(versionResults)}`);

    // 关闭连接
    await sequelize.close();
    console.log('✅ Connection closed successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

// 运行测试
testConnection();
