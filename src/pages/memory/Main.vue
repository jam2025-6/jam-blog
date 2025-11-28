<script setup lang="ts">
import { ref, onMounted } from "vue";

interface MemoryItem {
  id: number;
  title: string;
  description: string;
  images: string[];
  date: string;
  location: string;
  emotion: string;
  emotionIcon: string;
}

const memoryList = ref<MemoryItem[]>([]);

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
    images.push(`https://picsum.photos/seed/sea1/600/400`);
  }
  return images;
};

// 生成假数据
const generateFakeData = () => {
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

  const data: MemoryItem[] = [];

  for (let i = 0; i < 8; i++) {
    const imageCount = Math.floor(Math.random() * 5) + 1; // 1-5张图片
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];

    data.push({
      id: i + 1,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      images: generateRandomImages(imageCount),
      date: generateRandomDate(),
      location: locations[Math.floor(Math.random() * locations.length)],
      emotion: emotion.text,
      emotionIcon: emotion.icon,
    });
  }

  // 按日期倒序排列
  data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  memoryList.value = data;
};

onMounted(() => {
  generateFakeData();
});
</script>

<template>
  <ul class="memory-list">
    <li v-for="item in memoryList" :key="item.id" class="memory-item">
      <router-link :to="`/memory/${item.id}`" class="memory-link">
        <div class="memory-cover" v-if="item.images.length > 0">
          <img :src="item.images[0]" :alt="item.title" class="cover-image" />
        </div>
        <div class="memory-info">
          <h3 class="memory-title">{{ item.title }}</h3>
          <div class="memory-meta">
            <span class="date">{{ item.date }}</span>
            <span class="divider">·</span>
            <span class="location">{{ item.location }}</span>
            <span class="divider">·</span>
            <span class="emotion">{{ item.emotionIcon }} {{ item.emotion }}</span>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
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
