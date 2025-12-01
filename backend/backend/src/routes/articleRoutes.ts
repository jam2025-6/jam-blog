import { Router } from 'express';
import { ArticleController } from '../controllers/ArticleController';

const router = Router();

// 文章路由
router.get('/', ArticleController.getAllArticles);
router.get('/:id', ArticleController.getArticleById);
router.post('/', ArticleController.createArticle);
router.put('/:id', ArticleController.updateArticle);
router.delete('/:id', ArticleController.deleteArticle);

export default router;