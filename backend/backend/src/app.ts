import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import routes from './routes';
import corsMiddleware from './middleware/cors';
import errorHandler from './middleware/errorHandler';

// 加载环境变量
dotenv.config();

// 初始化Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件配置
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由配置
app.use(routes);

// 错误处理中间件（必须放在所有路由之后）
app.use(errorHandler);

// 测试路由
app.get('/', (req, res) => {
  res.send('Blog Backend API is running!');
});

// 启动服务器并同步数据库
const startServer = async () => {
  try {
    // 同步数据库模型
    await sequelize.sync({
      alter: true // 开发环境下自动修改表结构，生产环境建议改为false
    });
    console.log('Database synchronized successfully.');

    // 启动服务器
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// 启动应用
startServer();

export default app;