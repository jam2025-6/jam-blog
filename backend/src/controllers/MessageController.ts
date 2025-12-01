import { Request, Response } from 'express';
import { Message } from '../models/Message';

/**
 * @openapi
 * /api/messages: 
 *   get: 
 *     summary: Get all messages
 *     description: Retrieve a list of all messages with optional filtering by status
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         description: Filter messages by status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of messages per page
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Server Error
 */
export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const whereClause = status ? { status: status as string } : {};

    const messages = await Message.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      offset: offset,
      limit: Number(limit)
    });

    const total = await Message.count({ where: whereClause });

    res.status(200).json({
      messages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

/**
 * @openapi
 * /api/messages/{id}:
 *   get:
 *     summary: Get a single message
 *     description: Retrieve a single message by its ID
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Message ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 *       500:
 *         description: Server Error
 */
export const getMessageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

/**
 * @openapi
 * /api/messages:
 *   post:
 *     summary: Create a new message
 *     description: Create a new message with the provided data
 *     tags:
 *       - Messages
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageCreate'
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Invalid data
 */
export const createMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, content } = req.body;

    // Get IP and user agent from request
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';

    const message = await Message.create({
      name,
      email,
      content,
      ip,
      userAgent,
      status: 'pending'
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

/**
 * @openapi
 * /api/messages/{id}/status:
 *   put:
 *     summary: Update message status
 *     description: Update the status of a message by its ID
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Message ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *                 required: true
 *                 description: New status for the message
 *     responses:
 *       200:
 *         description: Message status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 *       400:
 *         description: Invalid data
 */
export const updateMessageStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const message = await Message.findByPk(req.params.id);

    if (!message) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }

    await message.update({ status });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

/**
 * @openapi
 * /api/messages/{id}:
 *   delete:
 *     summary: Delete a message
 *     description: Delete a message by its ID
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Message ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Message deleted
 *       404:
 *         description: Message not found
 *       500:
 *         description: Server Error
 */
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = await Message.findByPk(req.params.id);

    if (!message) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }

    await message.destroy();
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
