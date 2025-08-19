import { ref, onMounted, onUnmounted } from "vue";
interface TabVisibilityOptions {
  onVisible?: () => void;
  onHidden?: () => void;
}
export function useTabVisibility(options: TabVisibilityOptions = {}) {
  // 默认回调函数
  const { onVisible = () => {}, onHidden = () => {} } = options;

  // tab 当前状态
  const tabStatus = ref(document.visibilityState || "visible");

  // 处理 visibilitychange 事件
  const handleVisibilityChange = () => {
    tabStatus.value = document.visibilityState;
    if (document.visibilityState === "visible") {
      onVisible(); // 用户返回 tab 时触发
    } else {
      onHidden(); // 用户离开 tab 时触发
    }
  };

  // 生命周期管理
  onMounted(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  });

  onUnmounted(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  });

  // 返回 tab 状态和手动检查方法
  return {
    tabStatus, // 当前状态：'visible' 或 'hidden'
    isTabVisible: () => tabStatus.value === "visible", // 判断当前是否可见
  };
}
