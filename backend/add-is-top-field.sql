-- 使用数据库
USE `jam-blogs`;

-- 为文章表添加置顶字段
ALTER TABLE `articles`
ADD COLUMN `is_top` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否置顶，0：不置顶，1：置顶' AFTER `content`;

-- 添加复合索引，用于优化按置顶状态和日期排序的查询
CREATE INDEX `idx_articles_is_top_date` ON `articles` (`is_top`, `date`);
