<script setup lang="ts">
import dayjs from "dayjs";
import { ref, onMounted } from "vue";
import { selfTalkingApi } from "@/api";

interface SelfTalkingItem {
  id: number;
  time: string;
  content: string;
}

const selfTalkingList = ref<SelfTalkingItem[]>([]);
const loading = ref(true);

// 从API获取自言自语列表
const fetchSelfTalkings = async () => {
  loading.value = true;
  try {
    const data = await selfTalkingApi.getSelfTalkings();
    selfTalkingList.value = data;
  } catch (error) {
    console.error("Failed to fetch self-talkings:", error);
    selfTalkingList.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSelfTalkings();
});
</script>

<template>
  <div class="self-talking-container" v-loading="loading">
    <ul class="self-talking">
      <li v-for="item in selfTalkingList" :key="item.id" class="item">
        <div class="li-time">{{ dayjs(item.time).format("YYYY/MM/DD HH:mm:ss") }}</div>
        <div class="li-content">{{ item.content }}</div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
/* ✅ 移动端样式 */
@media (max-width: 768px) {
  .self-talking {
    padding: 16px;
  }
}

@media (min-width: 769px) {
  .self-talking {
    padding: 36px 16px 16px 16px;
    max-width: 800px;
    margin: 0 auto;
  }
}

.self-talking-container {
  width: 100%;
}

.self-talking {
  .item {
    min-height: 44px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 12px;
    padding: 16px;
    background-color: var(--bg-card);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    .li-time {
      font-size: 12px;
      color: var(--text-muted);
      margin-bottom: 8px;
      font-weight: 500;
    }

    .li-content {
      font-size: 16px;
      color: var(--text-color);
      line-height: 1.6;
      word-break: break-word;
    }
  }
}
</style>
