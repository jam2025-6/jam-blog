import { Router } from 'express';
import articleRoutes from './articleRoutes';
import memoryRoutes from './memoryRoutes';
import selfTalkingRoutes from './selfTalkingRoutes';

const router = Router();

// API路由前缀
router.use('/api/articles', articleRoutes);
router.use('/api/memories', memoryRoutes);
router.use('/api/self-talkings', selfTalkingRoutes);

export default router;