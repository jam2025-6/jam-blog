import { Request, Response } from 'express';
import { Article } from '../models/Article';

export class ArticleController {
  // 获取所有文章
  static async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await Article.findAll({
        order: [['date', 'DESC']]
      });
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch articles', error });
    }
  }

  // 获取单篇文章
  static async getArticleById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const article = await Article.findByPk(id);
      if (!article) {
        res.status(404).json({ message: 'Article not found' });
        return;
      }
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch article', error });
    }
  }

  // 创建文章
  static async createArticle(req: Request, res: Response): Promise<void> {
    try {
      const article = await Article.create(req.body);
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create article', error });
    }
  }

  // 更新文章
  static async updateArticle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const [updated] = await Article.update(req.body, {
        where: { id }
      });
      if (updated) {
        const updatedArticle = await Article.findByPk(id);
        res.status(200).json(updatedArticle);
      } else {
        res.status(404).json({ message: 'Article not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Failed to update article', error });
    }
  }

  // 删除文章
  static async deleteArticle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await Article.destroy({
        where: { id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Article not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete article', error });
    }
  }
}