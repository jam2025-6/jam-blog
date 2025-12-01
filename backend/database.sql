-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS `jam-blogs` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE `jam-blogs`;

-- 创建文章表
CREATE TABLE IF NOT EXISTS `articles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` VARCHAR(200) NOT NULL COMMENT '文章标题',
  `date` DATETIME NOT NULL COMMENT '文章日期',
  `content` TEXT NOT NULL COMMENT '文章内容',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_articles_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章表';

-- 创建回忆表
CREATE TABLE IF NOT EXISTS `memories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '回忆ID',
  `title` VARCHAR(200) NOT NULL COMMENT '回忆标题',
  `description` VARCHAR(500) NOT NULL COMMENT '回忆描述',
  `content` TEXT NOT NULL COMMENT '回忆内容',
  `date` DATETIME NOT NULL COMMENT '回忆日期',
  `location` VARCHAR(100) NOT NULL COMMENT '回忆地点',
  `emotion` VARCHAR(50) NOT NULL COMMENT '回忆情绪',
  `emotion_icon` VARCHAR(10) NOT NULL COMMENT '回忆情绪图标',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_memories_date` (`date`),
  INDEX `idx_memories_location` (`location`),
  INDEX `idx_memories_emotion` (`emotion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='回忆表';

-- 创建回忆图片表
CREATE TABLE IF NOT EXISTS `memory_images` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '图片ID',
  `memory_id` INT UNSIGNED NOT NULL COMMENT '关联的回忆ID',
  `url` VARCHAR(255) NOT NULL COMMENT '图片URL',
  `image_order` INT NOT NULL DEFAULT 0 COMMENT '图片排序',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_memory_images_memory_id` (`memory_id`),
  CONSTRAINT `fk_memory_images_memory_id` FOREIGN KEY (`memory_id`) REFERENCES `memories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='回忆图片表';

-- 创建自言自语表
CREATE TABLE IF NOT EXISTS `self_talkings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自言自语ID',
  `time` DATETIME NOT NULL COMMENT '记录时间',
  `content` VARCHAR(1000) NOT NULL COMMENT '内容',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_self_talkings_time` (`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='自言自语表';

-- 插入示例数据
-- 文章示例数据
INSERT INTO `articles` (`title`, `date`, `content`) VALUES
('我的第一篇博客', '2025-12-01 14:30:00', '这是我的第一篇博客文章，记录一下我的学习历程。'),
('Node.js学习笔记', '2025-11-28 10:15:00', 'Node.js是一个基于Chrome V8引擎的JavaScript运行环境...');

-- 回忆示例数据
INSERT INTO `memories` (`title`, `description`, `content`, `date`, `location`, `emotion`, `emotion_icon`) VALUES
('夏日海滩', '和家人一起去海滩度假', '这是一个美好的夏日，我们全家一起去了海滩，孩子们玩得很开心...', '2025-08-15 10:00:00', '三亚', '开心', '😊'),
('生日聚会', '30岁生日聚会', '今天是我的30岁生日，朋友们给我准备了一个惊喜聚会...', '2025-10-20 18:30:00', '家里', '感动', '🥰');

-- 回忆图片示例数据
INSERT INTO `memory_images` (`memory_id`, `url`, `image_order`) VALUES
(1, 'https://example.com/beach1.jpg', 0),
(1, 'https://example.com/beach2.jpg', 1),
(2, 'https://example.com/birthday1.jpg', 0),
(2, 'https://example.com/birthday2.jpg', 1);

-- 自言自语示例数据
INSERT INTO `self_talkings` (`time`, `content`) VALUES
('2025-12-01 08:00:00', '今天又是充满活力的一天！'),
('2025-11-30 22:00:00', '明天要更加努力学习！');

-- 创建留言表
CREATE TABLE IF NOT EXISTS `messages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '留言ID',
  `name` VARCHAR(100) NOT NULL COMMENT '留言者姓名',
  `email` VARCHAR(100) NULL COMMENT '留言者邮箱',
  `content` TEXT NOT NULL COMMENT '留言内容',
  `ip` VARCHAR(45) NOT NULL COMMENT '留言者IP地址',
  `user_agent` TEXT NOT NULL COMMENT '留言者浏览器信息',
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending' COMMENT '留言状态',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_messages_status` (`status`),
  INDEX `idx_messages_created_at` (`created_at`),
  INDEX `idx_messages_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='留言表';

-- 留言示例数据
INSERT INTO `messages` (`name`, `email`, `content`, `ip`, `user_agent`, `status`) VALUES
('张三', 'zhangsan@example.com', '这是一个很棒的博客！', '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36', 'approved'),
('李四', 'lisi@example.com', '我很喜欢这里的内容，继续加油！', '192.168.1.2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15', 'approved'),
('王五', NULL, '期待更多精彩内容！', '192.168.1.3', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1', 'pending');