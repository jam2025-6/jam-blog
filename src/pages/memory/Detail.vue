<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

// 导入 example.md 文件
import exampleMd from "./md/example.md?raw";

interface MemoryItem {
  id: number;
  title: string;
  description: string;
  content: string;
  images: string[];
  date: string;
  location: string;
  emotion: string;
  emotionIcon: string;
}

const route = useRoute();
const router = useRouter();
const memoryItem = ref<MemoryItem | null>(null);
const loading = ref(true);

// 生成随机日期
const generateRandomDate = (): string => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * 365); // 最近一年
  const randomDate = new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);

  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, "0");
  const day = String(randomDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// 生成随机图片
const generateRandomImages = (count: number): string[] => {
  const images: string[] = [];
  const categories = ["nature", "city", "food", "travel", "people", "animal", "art", "architecture"];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];

  for (let i = 0; i < count; i++) {
    images.push(`https://picsum.photos/seed/${randomCategory}${Math.random().toString(36).substr(2, 9)}/600/400`);
  }
  return images;
};

// 生成假数据
const generateFakeData = (id: number): MemoryItem => {
  const titles = [
    "海边的一天",
    "爬山记",
    "咖啡馆探店",
    "电影观后感",
    "厨艺新突破",
    "博物馆之旅",
    "家庭野餐",
    "跑步记录",
    "美丽日落",
    "好书推荐",
  ];

  const descriptions = [
    "去海边的一天，风景很美，放空很重要。",
    "今天和朋友一起爬山，虽然很累，但山顶的风景值得。",
    "尝试了新的咖啡馆，咖啡味道不错，环境也很舒适。",
    "周末在家看了一部好电影，剧情很感人。",
    "今天学会了一道新菜，家人都说好吃，很有成就感。",
    "去了博物馆，了解了很多历史文化知识。",
    "和家人一起野餐，天气很好，心情也很棒。",
    "今天跑步突破了自己的记录，坚持就是胜利。",
    "看到了美丽的日落，忍不住拍了很多照片。",
    "读了一本好书，收获很多，推荐给大家。",
  ];

  const locations = ["深圳", "北京", "上海", "广州", "杭州", "成都", "西安", "厦门", "青岛", "三亚"];

  const emotions = [
    { icon: "😄", text: "开心" },
    { icon: "😊", text: "愉快" },
    { icon: "😌", text: "平静" },
    { icon: "🤔", text: "思考" },
    { icon: "😮", text: "惊讶" },
    { icon: "😍", text: "喜爱" },
    { icon: "🤗", text: "温暖" },
    { icon: "😎", text: "酷炫" },
  ];

  const imageCount = Math.floor(Math.random() * 5) + 1; // 1-5张图片
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];

  return {
    id,
    title: titles[Math.floor(Math.random() * titles.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    content: exampleMd,
    images: generateRandomImages(imageCount),
    date: generateRandomDate(),
    location: locations[Math.floor(Math.random() * locations.length)],
    emotion: emotion.text,
    emotionIcon: emotion.icon,
  };
};

// 获取记忆详情
const fetchMemoryDetail = () => {
  const id = Number(route.params.id);
  // if (isNaN(id)) {
  //   router.push("/memory");
  //   return;
  // }

  // 在实际项目中，这里应该是API请求
  // 现在使用假数据模拟
  setTimeout(() => {
    memoryItem.value = generateFakeData(id);
    loading.value = false;
  }, 300);
};

// 返回列表页
const goBack = () => {
  router.push("/memory");
};

onMounted(() => {
  fetchMemoryDetail();
});
</script>

<template>
  <div class="memory-detail">
    <!-- 容器 -->
    <div class="container">
      <!-- 返回按钮 -->
      <button class="back-btn" @click="goBack">← 返回列表</button>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>

      <!-- 内容区域 -->
      <article v-else-if="memoryItem" class="article">
        <!-- 标题区域 -->
        <header class="article-header">
          <h1 class="article-title">{{ memoryItem.title }}</h1>

          <!-- 元信息 -->
          <div class="article-meta">
            <div class="meta-item">
              <span class="meta-label">日期：</span>
              <span class="meta-value">{{ memoryItem.date }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">地点：</span>
              <span class="meta-value">{{ memoryItem.location }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">心情：</span>
              <span class="meta-value emotion">{{ memoryItem.emotionIcon }} {{ memoryItem.emotion }}</span>
            </div>
          </div>
        </header>

        <!-- 封面图 -->
        <div class="article-cover" v-if="memoryItem.images.length > 0">
          <img :src="memoryItem.images[0]" :alt="memoryItem.title" class="cover-image" />
        </div>

        <!-- 内容主体 -->
        <div class="article-content">
          <!-- Markdown 内容 -->
          <div class="content-section">
            <MdPreview :model-value="memoryItem.content" />
          </div>

          <!-- 图片列表 -->
          <div class="content-section" v-if="memoryItem.images.length > 1">
            <h2 class="section-title">照片集</h2>
            <div class="image-gallery">
              <img
                v-for="(image, index) in memoryItem.images.slice(1)"
                :key="index"
                :src="image"
                :alt="`memory-${memoryItem.id}-${index + 1}`"
                class="gallery-image"
              />
            </div>
          </div>

          <!-- 文章底部 -->
          <footer class="article-footer">
            <div class="footer-line"></div>
            <p class="footer-text">这是一条美好的记忆，值得珍藏</p>
          </footer>
        </div>
      </article>

      <!-- 错误状态 -->
      <div v-else class="error">
        <div class="error-icon">⚠️</div>
        <h2>记忆不存在</h2>
        <p>抱歉，您访问的记忆可能已被删除或不存在</p>
        <button class="back-btn" @click="goBack">返回列表</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ✅ 移动端样式 */
@media (max-width: 768px) {
  .container {
    padding: 16px;
  }

  .article {
    .article-title {
      font-size: 24px;
    }

    .article-meta {
      flex-direction: column;
      gap: 8px;
    }

    .image-gallery {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (min-width: 769px) {
  .container {
    padding: 36px 16px 16px 16px;
    max-width: 800px;
    margin: 0 auto;
  }

  .article {
    .article-title {
      font-size: 32px;
    }

    .article-meta {
      flex-direction: row;
      gap: 24px;
    }

    .image-gallery {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.memory-detail {
  background-color: var(--bg-color);
  min-height: 100vh;

  .container {
    width: 100%;
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

  .loading,
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    background: var(--bg-card);
    border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid var(--border-color);
      border-top: 4px solid var(--color-main);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    .error-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    h2 {
      margin: 0 0 12px 0;
      color: var(--text-color);
      font-size: 24px;
    }

    p {
      margin: 0;
      color: var(--text-muted);
      font-size: 16px;
    }

    .back-btn {
      margin-top: 24px;
      margin-bottom: 0;
    }
  }

  .article {
    background: var(--bg-card);
    border-radius: 16px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
    overflow: hidden;

    /* 标题区域 */
    .article-header {
      padding: 32px;
      border-bottom: 1px solid var(--border-color);

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
        flex-wrap: wrap;

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;

          .meta-label {
            color: var(--text-muted);
            font-size: 14px;
            font-weight: 500;
          }

          .meta-value {
            color: var(--text-color);
            font-size: 14px;
            font-weight: 500;

            &.emotion {
              display: flex;
              align-items: center;
              gap: 4px;
            }
          }
        }
      }
    }

    /* 封面图 */
    .article-cover {
      width: 100%;
      overflow: hidden;

      .cover-image {
        width: 100%;
        height: auto;
        object-fit: cover;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.01);
        }
      }
    }

    /* 内容主体 */
    .article-content {
      padding: 32px;

      .content-section {
        margin-bottom: 40px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .description {
        color: var(--text-color);
        font-size: 18px;
        line-height: 1.8;
        letter-spacing: 0.5px;
        margin: 0;
        text-align: justify;
      }

      .section-title {
        color: var(--text-color);
        font-size: 22px;
        font-weight: 600;
        margin: 0 0 20px 0;
        padding-bottom: 12px;
        border-bottom: 2px solid var(--color-main);
        display: inline-block;
      }

      /* 图片列表 */
      .image-gallery {
        display: grid;
        gap: 16px;

        .gallery-image {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          }
        }
      }

      /* 文章底部 */
      .article-footer {
        margin-top: 60px;
        padding-top: 24px;
        border-top: 1px solid var(--border-color);

        .footer-line {
          width: 60px;
          height: 3px;
          background: var(--color-main);
          margin: 0 0 16px 0;
        }

        .footer-text {
          margin: 0;
          color: var(--text-muted);
          font-size: 14px;
          font-style: italic;
        }
      }
    }
  }

  /* Markdown 内容样式 */
  :deep(.md-editor-preview) {
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

    code {
      background-color: var(--bg-color);
      color: var(--text-color);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: "Consolas", "Monaco", "Courier New", monospace;
    }

    pre {
      background-color: var(--bg-color);
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 0 0 16px 0;

      code {
        background-color: transparent;
        padding: 0;
      }
    }
  }
}

/* 动画 */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
