import { Request, Response } from 'express';
import { SelfTalking } from '../models/SelfTalking';

/**
 * @openapi
 * /api/self-talkings: 
 *   get:
 *     summary: Get all self-talkings
 *     description: Retrieve a list of all self-talkings, sorted by time in descending order
 *     tags:
 *       - Self-Talkings
 *     responses:
 *       200:
 *         description: A list of self-talkings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SelfTalking'
 *       500:
 *         description: Server Error
 */
export const getSelfTalkings = async (req: Request, res: Response): Promise<void> => {
  try {
    const selfTalkings = await SelfTalking.findAll({
      order: [['time', 'DESC']],
      attributes: ['id', 'time', 'content']
    });
    res.status(200).json(selfTalkings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

/**
 * @openapi
 * /api/self-talkings:
 *   post:
 *     summary: Create a new self-talking
 *     description: Create a new self-talking record
 *     tags:
 *       - Self-Talkings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SelfTalking'
 *     responses:
 *       201:
 *         description: Self-talking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SelfTalking'
 *       400:
 *         description: Invalid data
 */
export const createSelfTalking = async (req: Request, res: Response): Promise<void> => {
  try {
    const selfTalking = await SelfTalking.create(req.body);
    res.status(201).json(selfTalking);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

/**
 * @openapi
 * /api/self-talkings/{id}:
 *   delete:
 *     summary: Delete a self-talking
 *     description: Delete a self-talking record by its ID
 *     tags:
 *       - Self-Talkings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Self-talking ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Self-talking deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Self-talking deleted
 *       404:
 *         description: Self-talking not found
 *       500:
 *         description: Server Error
 */
export const deleteSelfTalking = async (req: Request, res: Response): Promise<void> => {
  try {
    const selfTalking = await SelfTalking.findByPk(req.params.id);
    if (!selfTalking) {
      res.status(404).json({ message: 'Self-talking not found' });
      return;
    }
    await selfTalking.destroy();
    res.status(200).json({ message: 'Self-talking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};