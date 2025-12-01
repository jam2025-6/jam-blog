import { Request, Response } from 'express';
import { Memory } from '../models/Memory';
import { MemoryImage } from '../models/MemoryImage';

/**
 * @openapi
 * /api/memories: 
 *   get:
 *     summary: Get all memories
 *     description: Retrieve a list of all memories with their associated images, sorted by date in descending order
 *     tags:
 *       - Memories
 *     responses:
 *       200:
 *         description: A list of memories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Memory'
 *       500:
 *         description: Server Error
 */
export const getMemories = async (req: Request, res: Response): Promise<void> => {
  try {
    // 先查询所有回忆
    const memories = await Memory.findAll({
      order: [['date', 'DESC']]
    });

    // 转换数据格式并分步查询图片
    const formattedMemories = await Promise.all(memories.map(async memory => {
      // 查询当前回忆的所有图片
      const images = await MemoryImage.findAll({
        where: { memoryId: memory.id },
        order: [['image_order', 'ASC']]
      });

      // 转换为前端期望的格式
      return {
        ...memory.toJSON(),
        images: images.map(img => img.url)
      };
    }));

    res.status(200).json(formattedMemories);
  } catch (error) {
    console.error('Error fetching memories:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

/**
 * @openapi
 * /api/memories/{id}:
 *   get:
 *     summary: Get a single memory
 *     description: Retrieve a single memory by its ID, including associated images
 *     tags:
 *       - Memories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Memory ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single memory with images
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Memory'
 *       404:
 *         description: Memory not found
 *       500:
 *         description: Server Error
 */
export const getMemoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    // 先查询回忆详情
    const memory = await Memory.findByPk(req.params.id);
    if (!memory) {
      res.status(404).json({ message: 'Memory not found' });
      return;
    }

    // 单独查询关联的图片
    const images = await MemoryImage.findAll({
      where: { memoryId: memory.id },
      order: [['image_order', 'ASC']]
    });

    // 转换为前端期望的格式
    const formattedMemory = {
      ...memory.toJSON(),
      images: images.map(img => img.url)
    };

    res.status(200).json(formattedMemory);
  } catch (error) {
    console.error('Error fetching memory by id:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

/**
 * @openapi
 * /api/memories:
 *   post:
 *     summary: Create a new memory
 *     description: Create a new memory with associated images
 *     tags:
 *       - Memories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: 'Summer Vacation' }
 *               date: { type: string, format: 'date-time', example: '2025-08-15T10:00:00.000Z' }
 *               location: { type: string, example: 'Beach' }
 *               description: { type: string, example: 'A wonderful day at the beach' }
 *               images: { type: array, items: { type: string, example: 'https://example.com/image.jpg' } }
 *     responses:
 *       201:
 *         description: Memory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Memory'
 *       400:
 *         description: Invalid data
 */
export const createMemory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { images, ...memoryData } = req.body;

    // 处理时间：如果date是字符串，转换为Date对象
    if (memoryData.date && typeof memoryData.date === 'string') {
      // 检查是否是ISO格式（包含T和Z）
      if (memoryData.date.includes('T') && memoryData.date.includes('Z')) {
        // ISO格式的UTC时间，直接转换
        memoryData.date = new Date(memoryData.date);
      } else {
        // 本地时间字符串，转换为Date对象（会自动转换为UTC）
        memoryData.date = new Date(memoryData.date);
      }
    }

    const memory = await Memory.create(memoryData);
    let memoryImages: any[] = [];

    // Create memory images if provided
    if (images && Array.isArray(images)) {
      const imageData = images.map((url: string, index: number) => ({
        memoryId: memory.id,
        url,
        image_order: index
      }));
      memoryImages = await MemoryImage.bulkCreate(imageData);
    }

    // 转换数据格式以匹配前端期望
    const formattedMemory = {
      ...memory.toJSON(),
      images: memoryImages.map(img => img.url)
    };

    res.status(201).json(formattedMemory);
  } catch (error) {
    console.error('Error creating memory:', error);
    res.status(400).json({ message: 'Invalid data', error });
  }
};

/**
 * @openapi
 * /api/memories/{id}:
 *   put:
 *     summary: Update a memory
 *     description: Update an existing memory and its associated images by ID
 *     tags:
 *       - Memories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Memory ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: 'Summer Vacation' }
 *               date: { type: string, format: 'date-time', example: '2025-08-15T10:00:00.000Z' }
 *               location: { type: string, example: 'Beach' }
 *               description: { type: string, example: 'A wonderful day at the beach' }
 *               images: { type: array, items: { type: string, example: 'https://example.com/image.jpg' } }
 *     responses:
 *       200:
 *         description: Memory updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Memory'
 *       404:
 *         description: Memory not found
 *       400:
 *         description: Invalid data
 */
export const updateMemory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { images, ...memoryData } = req.body;
    const memory = await Memory.findByPk(req.params.id);

    if (!memory) {
      res.status(404).json({ message: 'Memory not found' });
      return;
    }

    // 处理时间：如果date是字符串，转换为Date对象
    if (memoryData.date && typeof memoryData.date === 'string') {
      // 检查是否是ISO格式（包含T和Z）
      if (memoryData.date.includes('T') && memoryData.date.includes('Z')) {
        // ISO格式的UTC时间，直接转换
        memoryData.date = new Date(memoryData.date);
      } else {
        // 本地时间字符串，转换为Date对象（会自动转换为UTC）
        memoryData.date = new Date(memoryData.date);
      }
    }

    // Update memory data
    await memory.update(memoryData);

    // Update memory images if provided
    if (images && Array.isArray(images)) {
      // Delete existing images
      await MemoryImage.destroy({ where: { memoryId: memory.id } });

      // Create new images
      const memoryImages: any = images.map((url: string, index: number) => ({
        memoryId: memory.id,
        url,
        image_order: index
      }));
      await MemoryImage.bulkCreate(memoryImages);
    }

    // 查询更新后的图片
    const updatedImages = await MemoryImage.findAll({
      where: { memoryId: memory.id },
      order: [['image_order', 'ASC']]
    });

    // 转换数据格式以匹配前端期望
    const formattedMemory = {
      ...memory.toJSON(),
      images: updatedImages.map(img => img.url)
    };

    res.status(200).json(formattedMemory);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

/**
 * @openapi
 * /api/memories/{id}:
 *   delete:
 *     summary: Delete a memory
 *     description: Delete a memory and its associated images by ID
 *     tags:
 *       - Memories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Memory ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Memory deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Memory deleted
 *       404:
 *         description: Memory not found
 *       500:
 *         description: Server Error
 */
export const deleteMemory = async (req: Request, res: Response): Promise<void> => {
  try {
    const memory = await Memory.findByPk(req.params.id);
    if (!memory) {
      res.status(404).json({ message: 'Memory not found' });
      return;
    }

    // Delete associated images
    await MemoryImage.destroy({ where: { memoryId: memory.id } });

    // Delete memory
    await memory.destroy();

    res.status(200).json({ message: 'Memory deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};