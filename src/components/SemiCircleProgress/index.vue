<template>
  <div class="rounded-semi-circle-progress" :style="containerStyle">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <!-- 背景轨道 -->
      <path :d="backgroundPath" :stroke="trackColor" :stroke-width="strokeWidth" fill="none" stroke-linecap="round" />

      <!-- 进度条 (带圆角) -->
      <path
        :d="progressPath"
        :stroke="progressColor"
        :stroke-width="strokeWidth"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke-linecap="round"
      />

      <!-- 进度文本 -->
      <text
        v-if="showText"
        :x="width / 2"
        :y="height - textOffset"
        text-anchor="middle"
        :font-size="textSize"
        :font-weight="textWeight"
        class="text"
      >
        {{ progressText }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  progress?: number; // 进度值 (0-100)
  size?: number; // 组件大小 (直径)
  strokeWidth?: number; // 进度条宽度
  trackColor?: string; // 轨道颜色
  progressColor?: string; // 进度条颜色
  showText?: boolean; // 是否显示进度文本
  textColor?: string; // 文本颜色
  textSize?: string; // 文本大小
  textWeight?: string; // 文本粗细
  textFormat?: (value: number) => string; // 文本格式化函数
  cornerRadius?: number; // 圆角半径 (0-1)
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  progress: 0,
  size: 200,
  strokeWidth: 10,
  trackColor: "#eee",
  progressColor: "#4CAF50",
  showText: true,
  textColor: "#333",
  textSize: "16px",
  textWeight: "normal",
  textFormat: (value: number) => `${Math.round(value)}%`,
  cornerRadius: 0.5, // 默认中等圆角
  title: "",
});

// 计算属性
const width = computed(() => props.size);
const height = computed(() => props.size / 2);
const radius = computed(() => (props.size - props.strokeWidth) / 2);
const circumference = computed(() => Math.PI * radius.value);
const dashOffset = computed(() => circumference.value * (1 - props.progress / 100));

// 计算圆角控制点
const cornerControl = computed(() => {
  // 根据 cornerRadius 计算贝塞尔曲线控制点位置
  const factor = Math.min(1, Math.max(0, props.cornerRadius)) * 0.5;
  return radius.value * factor;
});

// SVG路径 - 带圆角的半圆
const backgroundPath = computed(() => {
  const startX = props.strokeWidth / 2;
  const endX = width.value - props.strokeWidth / 2;
  const centerY = height.value;

  return `
    M ${startX},${centerY}
    C ${startX},${centerY - cornerControl.value} 
      ${startX + cornerControl.value},${centerY - radius.value} 
      ${startX + radius.value},${centerY - radius.value}
    A ${radius.value - cornerControl.value},${radius.value - cornerControl.value} 0 0 1 
      ${endX - radius.value},${centerY - radius.value}
    C ${endX - cornerControl.value},${centerY - radius.value} 
      ${endX},${centerY - cornerControl.value} 
      ${endX},${centerY}
  `;
});

const progressPath = computed(() => backgroundPath.value);

// 文本相关
const progressText = computed(() => props.title);
const textOffset = computed(() => props.size * 0.15);

// 容器样式
const containerStyle = computed(() => ({
  width: `${width.value}px`,
  height: `${height.value}px`,
}));
</script>

<style scoped>
.rounded-semi-circle-progress {
  display: inline-block;
  position: relative;
}

text {
  text-align: center;

  /* 二级标题投影 */
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
  font-family: "Alimama FangYuanTi VF";
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.4px;
  background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
