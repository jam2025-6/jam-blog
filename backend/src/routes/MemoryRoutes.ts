import express from 'express';
import { getMemories, getMemoryById, createMemory, updateMemory, deleteMemory } from '../controllers/MemoryController';

const router = express.Router();

router.route('/').get(getMemories).post(createMemory);
router.route('/:id').get(getMemoryById).put(updateMemory).delete(deleteMemory);

export default router;