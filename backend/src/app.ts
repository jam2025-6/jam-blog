import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './config/database';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import swaggerDocs from './config/swagger';

// Models
import { Article } from './models/Article';
import { Memory } from './models/Memory';
import { MemoryImage } from './models/MemoryImage';
import { SelfTalking } from './models/SelfTalking';
import { Message } from './models/Message';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Define model associations
Memory.hasMany(MemoryImage, {
  foreignKey: 'memoryId',
  as: 'images',
  onDelete: 'CASCADE'
});

MemoryImage.belongsTo(Memory, {
  foreignKey: 'memoryId',
  as: 'memory'
});

// Routes - Import after model associations are defined
import articleRoutes from './routes/ArticleRoutes';
import memoryRoutes from './routes/MemoryRoutes';
import selfTalkingRoutes from './routes/SelfTalkingRoutes';
import messageRoutes from './routes/MessageRoutes';

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsMiddleware);

// Routes
app.use('/api/articles', articleRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/self-talkings', selfTalkingRoutes);
app.use('/api/messages', messageRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});