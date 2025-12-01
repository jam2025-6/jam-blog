import { Request, Response } from 'express';
import { SelfTalking } from '../models/SelfTalking';

export class SelfTalkingController {
  // 获取所有自言自语记录
  static async getAllSelfTalkings(req: Request, res: Response): Promise<void> {
    try {
      const selfTalkings = await SelfTalking.findAll({
        order: [['time', 'DESC']]
      });
      res.status(200).json(selfTalkings);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch self-talkings', error });
    }
  }

  // 获取单条自言自语记录
  static async getSelfTalkingById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const selfTalking = await SelfTalking.findByPk(id);
      if (!selfTalking) {
        res.status(404).json({ message: 'Self-talking not found' });
        return;
      }
      res.status(200).json(selfTalking);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch self-talking', error });
    }
  }

  // 创建自言自语记录
  static async createSelfTalking(req: Request, res: Response): Promise<void> {
    try {
      const selfTalking = await SelfTalking.create(req.body);
      res.status(201).json(selfTalking);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create self-talking', error });
    }
  }

  // 更新自言自语记录
  static async updateSelfTalking(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const [updated] = await SelfTalking.update(req.body, {
        where: { id }
      });
      if (updated) {
        const updatedSelfTalking = await SelfTalking.findByPk(id);
        res.status(200).json(updatedSelfTalking);
      } else {
        res.status(404).json({ message: 'Self-talking not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Failed to update self-talking', error });
    }
  }

  // 删除自言自语记录
  static async deleteSelfTalking(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await SelfTalking.destroy({
        where: { id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Self-talking not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete self-talking', error });
    }
  }
}