import { Request, Response } from 'express';
import { Article } from '../models/Article';

/**
 * @openapi
 * /api/articles: 
 *   get:
 *     summary: Get all articles
 *     description: Retrieve a list of all articles, sorted by date in descending order
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       500:
 *         description: Server Error
 */
export const getArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const articles = await Article.findAll({
      order: [['date', 'DESC']],
      attributes: ['id', 'title', 'date']
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

/**
 * @openapi
 * /api/articles/{id}:
 *   get:
 *     summary: Get a single article
 *     description: Retrieve a single article by its ID
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Article ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 *       500:
 *         description: Server Error
 */
export const getArticleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

/**
 * @openapi
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     description: Create a new article with the provided data
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Invalid data
 */
export const createArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

/**
 * @openapi
 * /api/articles/{id}:
 *   put:
 *     summary: Update an article
 *     description: Update an existing article by its ID
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Article ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 *       400:
 *         description: Invalid data
 */
export const updateArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    const updatedArticle = await article.update(req.body);
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

/**
 * @openapi
 * /api/articles/{id}:
 *   delete:
 *     summary: Delete an article
 *     description: Delete an existing article by its ID
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Article ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article deleted
 *       404:
 *         description: Article not found
 *       500:
 *         description: Server Error
 */
export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
      return;
    }
    await article.destroy();
    res.status(200).json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};