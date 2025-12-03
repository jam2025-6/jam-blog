<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { memoryApi } from "@/api";

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
  coverImage: string;
}

const route = useRoute();
const router = useRouter();
const memoryItem = ref<MemoryItem | null>(null);
const loading = ref(true);
const currentTheme = ref(localStorage.getItem("theme") || "light");

// 监听localStorage变化
const handleStorageChange = (e: StorageEvent) => {
  if (e.key === "theme") {
    currentTheme.value = e.newValue || "light";
  }
};

// 监听body属性变化
const updateThemeFromBody = () => {
  const bodyTheme = document.body.getAttribute("data-theme");
  if (bodyTheme) {
    currentTheme.value = bodyTheme;
    localStorage.setItem("theme", bodyTheme);
  }
};

// 监听主题切换按钮的点击事件（通过MutationObserver）
let observer: MutationObserver | null = null;

onMounted(() => {
  fetchMemoryDetail();

  // 初始化主题
  updateThemeFromBody();

  // 添加事件监听
  window.addEventListener("storage", handleStorageChange);
  observer = new MutationObserver(updateThemeFromBody);
  observer.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
});

// 组件卸载前清理
onBeforeUnmount(() => {
  window.removeEventListener("storage", handleStorageChange);
  if (observer) {
    observer.disconnect();
  }
});

// 计算属性，返回当前主题
const theme = computed(() => {
  return currentTheme.value === "dark" ? "dark" : "light";
});

// 记忆文案列表
const memoryTexts = ref([
  "这是一条美好的记忆，值得珍藏",
  "时光荏苒，美好永驻心间",
  "每一段记忆，都是人生的宝贵财富",
  "愿这份美好，永远伴随你左右",
  "记忆中的瞬间，温暖了整个人生",
  "珍惜每一段时光，它们都是独特的回忆",
  "时光会老，但记忆永远年轻",
  "这些美好，将成为生命中最亮的星",
  "每一次回忆，都是一次心灵的旅行",
  "美好时光，值得用一生去回味"
]);

// 随机选择一条文案
const randomMemoryText = computed(() => {
  const randomIndex = Math.floor(Math.random() * memoryTexts.value.length);
  return memoryTexts.value[randomIndex];
});
// 获取记忆详情
const fetchMemoryDetail = async () => {
  const id = Number(route.params.id);
  if (isNaN(id)) {
    router.push("/memory");
    return;
  }

  loading.value = true;
  try {
    // 调用真实API获取记忆详情
    const data = await memoryApi.getMemoryById(id);
    memoryItem.value = data;
  } catch (error) {
    console.error("Failed to fetch memory detail:", error);
    // 如果获取失败，返回列表页
    router.push("/memory");
  } finally {
    loading.value = false;
  }
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
        <!-- <div class="article-cover" v-if="memoryItem.images.length > 0">
          <n-image lazy width="100%" preview-disabled class="cover-image"
            :src="memoryItem.coverImage || memoryItem.images[0]" :alt="memoryItem.title"
            :intersection-observer-options="{ rootMargin: '100px 0px', threshold: 0.1 }">
            <template #placeholder>
              <div class="image-placeholder">
                <div class="loading-spinner"></div>
              </div>
            </template>
          </n-image>
        </div> -->

        <!-- 内容主体 -->
        <div class="article-content">
          <!-- Markdown 内容 -->
          <div class="content-section">
            <MdPreview :theme="theme" previewTheme="cyanosis" :model-value="memoryItem.content" />
          </div>

          <!-- 图片列表 -->
          <div class="content-section" v-if="memoryItem.images.length > 1">
            <h2 class="section-title">照片集</h2>
            <div class="image-gallery">
              <n-image v-for="(image, index) in memoryItem.images.slice(1)" :key="index" :src="image" lazy
                :alt="`memory-${memoryItem.id}-${index + 1}`" class="gallery-image" width="100%"
                :intersection-observer-options="{ rootMargin: '100px 0px', threshold: 0.1 }">
                <template #placeholder>
                  <div class="image-placeholder">
                    <div class="loading-spinner"></div>
                  </div>
                </template>
              </n-image>
            </div>
          </div>

          <!-- 文章底部 -->
          <footer class="article-footer">
            <div class="footer-line"></div>
            <p class="footer-text">{{ randomMemoryText }}</p>
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
      padding:0 32px;

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

      /* 图片占位符样式 */
      :deep(.n-image-placeholder) {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg-color);
        border-radius: 12px;
        height: 100%;
        width: 100%;

        .loading-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid var(--border-color);
          border-top: 3px solid var(--color-main);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      }

      .gallery-image {
        aspect-ratio: 4/3;
        object-fit: cover;
      }

      .cover-image {
        aspect-ratio: 16/9;
        object-fit: cover;
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
