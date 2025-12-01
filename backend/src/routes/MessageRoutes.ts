import express from 'express';
import {
  getMessages,
  getMessageById,
  createMessage,
  updateMessageStatus,
  deleteMessage
} from '../controllers/MessageController';

const router = express.Router();

router.route('/')
  .get(getMessages)
  .post(createMessage);

router.route('/:id')
  .get(getMessageById)
  .delete(deleteMessage);

router.route('/:id/status')
  .put(updateMessageStatus);

export default router;
