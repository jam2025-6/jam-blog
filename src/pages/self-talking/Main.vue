<script setup lang="ts">
import { ref, onMounted } from "vue";

interface SelfTalkingItem {
  id: number;
  time: string;
  content: string;
}

const selfTalkingList = ref<SelfTalkingItem[]>([]);

// 生成随机时间
const generateRandomTime = (): string => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * 30); // 最近30天内
  const randomDate = new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);

  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, "0");
  const day = String(randomDate.getDate()).padStart(2, "0");
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  const seconds = String(Math.floor(Math.random() * 60)).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

// 生成随机内容
const generateRandomContent = (): string => {
  const contents = [
    "今天天气真好，适合出去散步",
    "刚刚完成了一个重要的项目，感觉很有成就感",
    "学习Vue3真的很有趣，组合式API让代码更清晰",
    "最近在看一本好书，推荐给大家",
    "今天尝试了新的菜谱，味道还不错",
    "生活就像一盒巧克力，你永远不知道下一颗是什么味道",
    "保持积极的心态，每天都是新的开始",
    "努力工作，享受生活，这才是人生的意义",
    "今天遇到了一个有趣的人，聊了很多有意义的话题",
    "学习是一个终身的过程，不断进步才能保持竞争力",
    "有时候，简单的生活才是最幸福的",
    "感谢身边的朋友和家人，有你们真好",
    "今天的夕阳真美，忍不住拍了几张照片",
    "运动让我感觉充满活力，坚持锻炼很重要",
    "阅读可以拓宽视野，让我们看到更广阔的世界",
  ];
  return contents[Math.floor(Math.random() * contents.length)];
};

// 生成假数据
const generateFakeData = (count: number = 50) => {
  const data: SelfTalkingItem[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      time: generateRandomTime(),
      content: generateRandomContent(),
    });
  }
  // 按时间倒序排列
  data.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  selfTalkingList.value = data;
};

onMounted(() => {
  generateFakeData();
});
</script>

<template>
  <ul class="self-talking">
    <li v-for="item in selfTalkingList" :key="item.id" class="item">
      <div class="li-time">{{ item.time }}</div>
      <div class="li-content">{{ item.content }}</div>
    </li>
  </ul>
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
