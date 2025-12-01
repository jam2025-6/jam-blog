import { Request, Response } from 'express';
import { Memory } from '../models/Memory';
import { MemoryImage } from '../models/MemoryImage';

export class MemoryController {
  // 获取所有回忆
  static async getAllMemories(req: Request, res: Response): Promise<void> {
    try {
      const memories = await Memory.findAll({
        include: [MemoryImage],
        order: [['date', 'DESC']]
      });
      res.status(200).json(memories);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch memories', error });
    }
  }

  // 获取单个回忆
  static async getMemoryById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const memory = await Memory.findByPk(id, {
        include: [MemoryImage]
      });
      if (!memory) {
        res.status(404).json({ message: 'Memory not found' });
        return;
      }
      res.status(200).json(memory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch memory', error });
    }
  }

  // 创建回忆
  static async createMemory(req: Request, res: Response): Promise<void> {
    try {
      const { images, ...memoryData } = req.body;
      const memory = await Memory.create(memoryData);

      if (images && images.length > 0) {
        const memoryImages = images.map((url: string) => ({
          url,
          memoryId: memory.id
        }));
        await MemoryImage.bulkCreate(memoryImages);
      }

      const createdMemory = await Memory.findByPk(memory.id, {
        include: [MemoryImage]
      });

      res.status(201).json(createdMemory);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create memory', error });
    }
  }

  // 更新回忆
  static async updateMemory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { images, ...memoryData } = req.body;

      const [updated] = await Memory.update(memoryData, {
        where: { id }
      });

      if (updated) {
        // 更新图片
        if (images !== undefined) {
          // 删除旧图片
          await MemoryImage.destroy({
            where: { memoryId: id }
          });

          // 添加新图片
          if (images.length > 0) {
            const memoryImages = images.map((url: string) => ({
              url,
              memoryId: parseInt(id)
            }));
            await MemoryImage.bulkCreate(memoryImages);
          }
        }

        const updatedMemory = await Memory.findByPk(id, {
          include: [MemoryImage]
        });
        res.status(200).json(updatedMemory);
      } else {
        res.status(404).json({ message: 'Memory not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Failed to update memory', error });
    }
  }

  // 删除回忆
  static async deleteMemory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await Memory.destroy({
        where: { id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Memory not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete memory', error });
    }
  }
}