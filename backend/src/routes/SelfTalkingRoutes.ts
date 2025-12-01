import express from 'express';
import { getSelfTalkings, createSelfTalking, deleteSelfTalking } from '../controllers/SelfTalkingController';

const router = express.Router();

router.route('/').get(getSelfTalkings).post(createSelfTalking);
router.route('/:id').delete(deleteSelfTalking);

export default router;