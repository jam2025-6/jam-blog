import { Router } from 'express';
import { SelfTalkingController } from '../controllers/SelfTalkingController';

const router = Router();

// 自言自语路由
router.get('/', SelfTalkingController.getAllSelfTalkings);
router.get('/:id', SelfTalkingController.getSelfTalkingById);
router.post('/', SelfTalkingController.createSelfTalking);
router.put('/:id', SelfTalkingController.updateSelfTalking);
router.delete('/:id', SelfTalkingController.deleteSelfTalking);

export default router;