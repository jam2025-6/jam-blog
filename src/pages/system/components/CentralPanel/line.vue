<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

/** =============== 全局 RAF 驱动 =============== */
const globalTime = ref(0);
let rafId: number | null = null;
let useCount = 0;

function loop() {
  globalTime.value = performance.now();
  rafId = requestAnimationFrame(loop);
}

function startTicker() {
  if (!rafId) loop();
}
function stopTicker() {
  if (rafId && useCount === 0) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

/** Hook: 返回全局时间 */
function useGlobalTicker() {
  useCount++;
  startTicker();
  onUnmounted(() => {
    useCount--;
    stopTicker();
  });
  return globalTime;
}

/** =============== 组件逻辑 =============== */
interface Props {
  points?: { x: number; y: number }[];
  status?: boolean; // 线条状态
  forward?: boolean; // 流动方向
  bgForward?: boolean; //背景样式
}
const props = withDefaults(defineProps<Props>(), {
  points: () => [],
  status: true,
  forward: true,
  bgForward: true,
});

const pathLength = ref(0);
const samplePoints = ref<{ x: number; y: number; len: number }[]>([]);

// 用全局时间驱动
const tick = useGlobalTicker();

// 动画进度：0-1
const progress = computed(() => {
  return (tick.value * 0.0002) % 1; // 速度可调：0.001 越大越快
});

const dashOffset = computed(() => pathLength.value * (1 - progress.value));

/** 箭头位置计算（查表而不是 getPointAtLength） */
function getArrowTransform(offset = 0) {
  if (!props.status || samplePoints.value.length === 0) return "";

  const totalLen = pathLength.value;
  let targetLen = progress.value * totalLen + offset;

  // wrap around
  if (targetLen < 0) targetLen += totalLen;
  if (targetLen > totalLen) targetLen -= totalLen;

  // 找到采样点
  let i = 0;
  while (i < samplePoints.value.length - 1 && samplePoints.value[i + 1].len < targetLen) {
    i++;
  }

  const p1 = samplePoints.value[i];
  const p2 = samplePoints.value[i + 1] || p1;

  const ratio = (targetLen - p1.len) / (p2.len - p1.len || 1);
  const x = p1.x + (p2.x - p1.x) * ratio;
  const y = p1.y + (p2.y - p1.y) * ratio;

  const angle = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
  return `translate(${x},${y}) rotate(${angle})`;
}

const arrowTransform = computed(() => getArrowTransform(0));
const arrowTransform2 = computed(() => getArrowTransform(-16));

/** 构造路径字符串 */
const pathData = computed(() => {
  const pts = props.forward ? props.points : [...props.points].reverse();
  if (pts.length === 0) return "";
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L${pts[i].x},${pts[i].y}`;
  }
  return d;
});

/** 手动采样路径点表 */
function buildSamplePoints(points: { x: number; y: number }[], step = 2) {
  const arr: { x: number; y: number; len: number }[] = [];
  let total = 0;
  arr.push({ ...points[0], len: 0 });
  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const segLen = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(1, Math.floor(segLen / step));
    for (let j = 1; j <= steps; j++) {
      const ratio = j / steps;
      const x = p1.x + dx * ratio;
      const y = p1.y + dy * ratio;
      total += segLen / steps;
      arr.push({ x, y, len: total });
    }
  }
  pathLength.value = total;
  return arr;
}

onMounted(() => {
  if (props.points.length > 1) {
    const pts = props.forward ? props.points : [...props.points].reverse();
    samplePoints.value = buildSamplePoints(pts, 2); // step 越大采样越少，性能更好
  }
});
</script>

<template>
  <div class="svg-flow-container">
    <svg width="1430" height="449" viewBox="0 0 1430 449">
      <!-- 背景路径 -->
      <path
        :d="pathData"
        fill="none"
        :stroke="props.bgForward ? 'url(#gradStroke)' : 'url(#gradStrokeBack )'"
        stroke-width="8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- 流动路径 -->
      <!-- <path
        :d="pathData"
        fill="none"
        stroke="url(#gradStrokeInActive)"
        stroke-width="8"
        :stroke-dasharray="pathLength"
        :stroke-dashoffset="dashOffset"
        stroke-linecap="round"
        stroke-linejoin="round"
      /> -->

      <!-- 箭头 -->
      <g :transform="arrowTransform">
        <path d="M0,-8 L10,0 L0,8 M2,-8 L12,0 L2,8" fill="none" stroke="rgba(11, 187, 231, 1)" stroke-width="3" />
      </g>
      <g :transform="arrowTransform2">
        <path d="M0,-8 L10,0 L0,8 M2,-8 L12,0 L2,8" fill="none" stroke="rgba(44, 230, 255, 1)" stroke-width="3" />
      </g>

      <defs>
        <linearGradient id="gradStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2A7EB1" />
          <stop offset="100%" stop-color="#00E1FF" />
        </linearGradient>
        <linearGradient id="gradStrokeBack" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00E1FF" />
          <stop offset="100%" stop-color="#2A7EB1" />
        </linearGradient>
        <linearGradient id="gradStrokeInActive" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stop-color="#00E1FF" />
          <stop offset="1" stop-color="#00E1FF" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
.svg-flow-container {
  width: 100%;
  position: absolute;
  inset: 0;
  background: transparent;
  border-radius: 4px;
}
</style>
