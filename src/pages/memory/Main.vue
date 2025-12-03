<script setup lang="ts">
import { memoryApi } from "@/api";
import dayjs from "dayjs";

interface MemoryItem {
  id: number | string;
  title: string;
  images: string[];
  date: string;
  location: string;
  emotion: string;
  emotionIcon: string;
  coverImage?: string;
}

const memoryList = ref<MemoryItem[]>([]);
const loading = ref(true);

// 从API获取回忆列表
const fetchMemories = async () => {
  loading.value = true;
  try {
    const data = await memoryApi.getMemories();
    memoryList.value = data;
  } catch (error) {
    console.error("Failed to fetch memories:", error);
    memoryList.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMemories();
});
</script>

<template>
  <div class="memory-container" v-loading="loading">
    <ul class="memory-list" v-if="memoryList && memoryList.length">
      <li v-for="item in memoryList" :key="item.id" class="memory-item">
        <router-link :to="`/memory/${item.id}`" class="memory-link">
          <div class="memory-cover" v-if="item.images.length > 0">
            <n-image
              lazy
              width="100%"
              preview-disabled
              class="cover-image"
              :src="item.coverImage || item.images[0]"
              :alt="item.title"
            />
          </div>
          <div class="memory-info">
            <h3 class="memory-title">{{ item.title }}</h3>
            <div class="memory-meta">
              <span class="date">{{ dayjs(item.date).format("YYYY/MM/DD") }}</span>
              <span class="divider">·</span>
              <span class="location">{{ item.location }}</span>
              <span class="divider">·</span>
              <span class="emotion">{{ item.emotionIcon }} {{ item.emotion }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="empty" v-else>
      <n-empty size="huge" description="你什么也找不到"> </n-empty>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ✅ 移动端样式 */
@media (max-width: 768px) {
  .memory-list {
    padding: 20px 16px;
    background-color: var(--bg-color);
  }

  .memory-item {
    margin-bottom: 20px;

    .memory-link {
      flex-direction: column;
      border-radius: 16px;
      padding: 16px;
      background: var(--bg-card);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      overflow: visible;
    }

    .memory-cover {
      width: 100%;
      height: 160px;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 12px;
    }

    .memory-info {
      padding: 0;
      background: transparent;
      border-radius: 0;
    }

    .memory-title {
      font-size: 16px !important;
      line-height: 1.5 !important;
      margin-bottom: 8px !important;
    }

    .memory-meta {
      gap: 6px !important;
      font-size: 12px !important;
    }
  }
}

@media (min-width: 769px) {
  .memory-list {
    padding: 36px 16px 16px 16px;
    max-width: 800px;
    margin: 0 auto;
  }

  .memory-item {
    margin-bottom: 24px;

    .memory-link {
      flex-direction: row;
      border-radius: 16px;
    }

    .memory-cover {
      width: 200px;
      height: 150px;
    }

    .memory-info {
      padding: 0 0 0 20px;
      flex: 1;
    }

    .memory-title {
      font-size: 20px;
      line-height: 1.4;
      margin-bottom: 8px;
    }

    .memory-meta {
      gap: 8px;
      font-size: 14px;
    }
  }
}

.memory-container {
  width: 100%;
  height: 100%;
}

.empty {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.memory-list {
  list-style: none;
  margin: 0;
  background-color: var(--bg-color);
}

.memory-item {
  .memory-link {
    display: flex;
    background: var(--bg-card);
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .memory-cover {
    overflow: hidden;

    .cover-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .memory-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .memory-title {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 600;
      color: var(--text-color);
      line-height: 1.4;
    }

    .memory-meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 14px;
      color: var(--text-muted);

      .divider {
        margin: 0 4px;
      }

      .emotion {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .date,
      .location {
        font-weight: 500;
      }
    }
  }
}
</style>
