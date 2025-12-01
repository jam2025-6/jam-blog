<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useMessage } from "naive-ui";
import { useRouter, useRoute } from "vue-router";
import FeedbackModal from "@/components/FeedbackModal/index.vue";
const message = useMessage();
const router = useRouter();
const route = useRoute();
const activePath = ref("/article");
const isDarkTheme = ref(false);
const langOptions = ref([
  {
    label: "简体中文",
    key: "zh-CN",
  },
  {
    label: "English",
    key: "en-US",
  },
]);

// 初始化主题
onMounted(() => {
  activePath.value = route.path;

  // 从localStorage获取主题偏好
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    isDarkTheme.value = true;
    document.body.setAttribute("data-theme", "dark");
  } else {
    isDarkTheme.value = false;
    document.body.setAttribute("data-theme", "light");
  }
});

// 监听路由变化，更新activePath
watch(
  () => route.path,
  (newPath) => {
    activePath.value = newPath;
  }
);

// 切换主题
function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
  const newTheme = isDarkTheme.value ? "dark" : "light";

  // 保存到localStorage
  localStorage.setItem("theme", newTheme);

  // 应用主题
  document.body.setAttribute("data-theme", newTheme);

  message.info(`已切换到${newTheme === "dark" ? "深色" : "浅色"}主题`);
}

function handleSelect(value: string) {
  message.info(String(value));
}

function handleClick(path: string) {
  activePath.value = path;
  router.push(path);
}
</script>

<template>
  <header class="app-header">
    <div class="header">
      <nav class="nav-ls">
        <ul>
          <li :class="{ active: activePath === '/article' }" @click="handleClick('/article')">文章</li>
          <li :class="{ active: activePath === '/self-talking' }" @click="handleClick('/self-talking')">碎碎念</li>
          <li :class="{ active: activePath === '/memory' }" @click="handleClick('/memory')">点滴</li>
        </ul>
      </nav>
      <section class="btn-ls">
        <SvgIcon :name="isDarkTheme ? 'nightMode' : 'dayMode'" @click="toggleTheme" class="theme-toggle" />
        <n-dropdown size="large" trigger="hover" :options="langOptions" @select="handleSelect">
          <SvgIcon name="language" />
        </n-dropdown>
        <SvgIcon name="search" />
      </section>
    </div>
  </header>
  <!-- 留言板组件 -->
  <FeedbackModal />
</template>

<style lang="scss" scoped>
.app-header {
  height: 56px;
  width: 100%;
  position: fixed;
  left: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px); /* 背景模糊 */
  -webkit-backdrop-filter: blur(10px); /* Safari 支持 */
  z-index: 11111;
  background-color: var(--bg-page);
  .header {
    max-width: 780px;
    padding: 0 24px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 0 24px;
    .nav-ls {
      display: flex;
      align-items: center;
      height: 100%;
      > ul {
        display: flex;
        align-items: center;
        height: 100%;
        gap: 0 24px;
        font-size: 16px;
        > li {
          opacity: 0.8;
          cursor: pointer;
          color: var(--text-color);
          &:hover {
            opacity: 1;
            text-decoration: underline;
          }
          &.active {
            opacity: 1;
            font-weight: bold;
          }
        }
      }
    }
    .btn-ls {
      display: flex;
      align-items: center;
      gap: 0 24px;
      .svg-icon {
        cursor: pointer;
        user-select: none;
        font-size: 18px;
        opacity: 0.8;
        color: var(--text-color);
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
