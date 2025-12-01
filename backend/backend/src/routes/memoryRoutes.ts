import { Router } from 'express';
import { MemoryController } from '../controllers/MemoryController';

const router = Router();

// 回忆路由
router.get('/', MemoryController.getAllMemories);
router.get('/:id', MemoryController.getMemoryById);
router.post('/', MemoryController.createMemory);
router.put('/:id', MemoryController.updateMemory);
router.delete('/:id', MemoryController.deleteMemory);

export default router;