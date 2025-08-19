<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
interface Props {
  points?: { x: number; y: number }[]; //连线位置
  status?: boolean; // 线条状态
  forward?: boolean; //流动方向
}
// 设置默认props值
const props = withDefaults(defineProps<Props>(), {
  points: () => [],
  status: true,
  forward: true,
});
const svgEl = ref(null);
const pathEl = ref<any>(null);
const pathLength = ref(0);
const progress = ref(0);
const animationFrame = ref<any>(null);
const isPlaying = ref(true);

// 直线路径数据
const points = ref(props.forward ? props.points : props.points.reverse());

const pathData = computed(() => {
  let d = `M${points.value[0].x},${points.value[0].y}`;
  for (let i = 1; i < points.value.length; i++) {
    d += ` L${points.value[i].x},${points.value[i].y}`;
  }
  return d;
});

const dashOffset = computed(() => pathLength.value * (1 - progress.value));

const arrowTransform = computed(() => {
  if (!props.status) return "";
  if (!pathEl.value) return "";

  const totalLen = pathLength.value;
  const len = progress.value * totalLen;

  // 当前点
  const point = pathEl.value.getPointAtLength(len);

  // 用一个微小偏移计算方向（正数往前取一点，保证拐弯平滑）
  const delta = 0.1; // 越小越跟随路径，越大越平滑
  const nextPoint = pathEl.value.getPointAtLength(Math.min(len + delta, totalLen));

  const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;

  return `translate(${point.x},${point.y}) rotate(${angle})`;
});
const arrowTransform2 = computed(() => {
  if (!props.status) return "";
  if (!pathEl.value) return "";

  const totalLen = pathLength.value;
  const len = progress.value * totalLen - 16;

  // 当前点
  const point = pathEl.value.getPointAtLength(len);

  // 用一个微小偏移计算方向（正数往前取一点，保证拐弯平滑）
  const delta = 0.1; // 越小越跟随路径，越大越平滑
  const nextPoint = pathEl.value.getPointAtLength(Math.min(len + delta, totalLen));

  const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;

  return `translate(${point.x},${point.y}) rotate(${angle})`;
});

const animate = () => {
  if (!isPlaying.value) return;

  progress.value = (progress.value + 0.005) % 1;
  animationFrame.value = requestAnimationFrame(animate);
};

const toggleAnimation = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) animate();
};

onMounted(() => {
  // 双重确保路径长度获取
  const init = () => {
    pathLength.value = calculateManualLength();
    console.log("Initialized, path length:", pathLength.value);
    if (pathLength.value > 0) {
      animate();
    } else {
      setTimeout(init, 100);
    }
  };
  init();
});

// 手动计算路径总长度（不依赖SVG API）
const calculateManualLength = () => {
  let total = 0;
  for (let i = 1; i < points.value.length; i++) {
    const p1 = points.value[i - 1];
    const p2 = points.value[i];
    total += Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  }
  return total;
};

onUnmounted(() => {
  cancelAnimationFrame(animationFrame.value);
});
</script>
<template>
  <div class="svg-flow-container">
    <svg ref="svgEl" width="1430" height="449" viewBox="0 0 1430 449">
      <!-- 背景路径 -->
      <path
        ref="pathEl"
        :d="pathData"
        fill="none"
        :stroke="props.status ? 'url(#gradStroke)' : 'url(#gradStrokeInActive)'"
        stroke-width="6"
        stroke-linecap="round"
      />

      <!-- 流动路径 -->
      <path
        :d="pathData"
        fill="none"
        :stroke="props.status ? 'url(#gradStroke)' : 'url(#gradStrokeInActive)'"
        stroke-width="6"
        :stroke-dasharray="pathLength"
        :stroke-dashoffset="dashOffset"
      />

      <!-- 箭头 -->
      <g :transform="arrowTransform">
        <path d="M0,-8 L10,0 L0,8 M2,-8 L12,0 L2,8" fill="none" stroke="rgba(11, 187, 231, 1)" stroke-width="3" />
      </g>
      <g :transform="arrowTransform2">
        <g>
          <path d="M0,-8 L10,0 L0,8 M2,-8 L12,0 L2,8" fill="none" stroke="rgba(44, 230, 255, 1)" stroke-width="3" />
        </g>
      </g>

      <defs>
        <!-- 定义线性渐变 -->
        <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2A7EB1" />
          <stop offset="100%" stop-color="#00E1FF" />
        </linearGradient>
        <linearGradient id="gradStrokeInActive" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stop-color="#2A7EB1" />
          <stop offset="1" stop-color="#2A7EB1" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
.svg-flow-container {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: transparent;
  border-radius: 4px;
}

.debug-info {
  position: absolute;
  top: 10px;
  left: 10px;
  background: transparent;
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
}

button {
  margin-top: 5px;
  padding: 3px 8px;
}
</style>
