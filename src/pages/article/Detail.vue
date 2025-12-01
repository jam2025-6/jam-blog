<template>
  <div class="article-detail">
    <div class="container">
      <!-- 返回按钮 -->
      <button class="back-btn" @click="goBack">← 返回列表</button>

      <!-- 文章内容 -->
      <article class="article-content">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">{{ article.date }}</div>

        <!-- 文章正文 - 使用 md-editor-v3 显示 Markdown 内容 -->
        <div class="article-body">
          <MdPreview :model-value="article.content" />
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

// 导入 example.md 文件
import exampleMd from "./md/example.md?raw";

const router = useRouter();
const route = useRoute();

interface Article {
  id: number;
  title: string;
  date: string;
  content: string;
}

const article = ref<Article>({
  id: 0,
  title: "",
  date: "",
  content: "",
});

// 文章数据 - 使用 example.md 内容
const articlesData: Article[] = [
  {
    id: 1,
    title: "Vue 3 组合式 API 学习笔记",
    date: "2025-11-28",
    content: exampleMd,
  },
  {
    id: 2,
    title: "前端性能优化实战",
    date: "2025-11-27",
    content: exampleMd,
  },
  {
    id: 3,
    title: "TypeScript 高级类型用法",
    date: "2025-11-26",
    content: exampleMd,
  },
];

// 返回列表页
const goBack = () => {
  router.push("/article");
};

// 获取文章详情
const getArticleDetail = () => {
  const id = Number(route.params.id);
  const foundArticle = articlesData.find((item) => item.id === id);
  if (foundArticle) {
    article.value = foundArticle;
  } else {
    // 如果找不到文章，返回列表页
    router.push("/article");
  }
};

onMounted(() => {
  getArticleDetail();
});
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 36px 16px 16px 16px;
  background-color: var(--bg-color);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    background: var(--color-main);
    color: #ffffff;
    border-color: var(--color-main);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  }
}

.article-content {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
}

.article-title {
  margin: 0 0 24px 0;
  color: var(--text-color);
  font-size: 32px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.5px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.article-body {
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.8;

  h2 {
    margin: 32px 0 16px 0;
    font-size: 24px;
    font-weight: 600;
    color: var(--text-color);
  }

  h3 {
    margin: 24px 0 12px 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-color);
  }

  p {
    margin: 0 0 16px 0;
  }

  ul {
    margin: 0 0 16px 0;
    padding-left: 24px;

    li {
      margin-bottom: 8px;
    }
  }
}

/* 移动端样式 */
@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  .article-content {
    padding: 20px;
  }

  .article-title {
    font-size: 24px;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
