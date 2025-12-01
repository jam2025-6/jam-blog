<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { articleApi } from "@/api";

const router = useRouter();

interface Article {
  id: number;
  title: string;
  date: string;
}

const articles = ref<Article[]>([]);
const loading = ref(true);

// 跳转到文章详情页
function goToDetail(id: number) {
  router.push(`/article/${id}`);
}

// 从API获取文章数据
const fetchArticles = async () => {
  loading.value = true;
  try {
    const data = await articleApi.getArticles();
    articles.value = data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    articles.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchArticles();
});
</script>

<template>
  <ul class="article">
    <li v-for="item in articles" :key="item.id" class="article-item">
      <div class="article-content">
        <div class="article-title" @click="goToDetail(item.id)">{{ item.title }}</div>
        <div class="article-meta">{{ dayjs(item.date).format("YYYY/MM/DD") }}</div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
/* ✅ 移动端样式 */
@media (max-width: 768px) {
  .article {
    padding: 20px 16px;
    background-color: var(--bg-color);
  }

  .article-item {
    display: flex;
    flex-direction: column;
    padding: 16px 12px;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }

    .article-content {
      padding: 0;
    }

    .article-title {
      color: var(--text-color);
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      margin: 0 0 6px 0;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-main);
      }
    }

    .article-meta {
      color: var(--text-muted);
      font-size: 13px;
      font-weight: 400;
      margin: 0;
    }
  }
}

/* ✅ 桌面端样式 */
@media (min-width: 769px) {
  .article {
    padding: 36px 16px 16px 16px;
    background-color: var(--bg-color);
  }

  .article-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid var(--border-color);
    transition: all 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.02);
      padding-left: 8px;
      padding-right: 8px;
    }

    .article-title {
      flex: 1;
      color: var(--text-color);
      cursor: pointer;
      font-size: 20px;
      font-weight: 500;
      line-height: 1.6;
      transition: color 0.2s ease;
      margin-right: 16px;

      &:hover {
        color: var(--color-main);
        text-decoration: none;
      }
    }

    .article-meta {
      color: var(--text-muted);
      white-space: nowrap;
      font-size: 14px;
    }
  }
}

.article {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: var(--bg-color);
}

.article-item {
  /* 基础样式 */
}
</style>
