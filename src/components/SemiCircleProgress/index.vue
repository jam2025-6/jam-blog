<template>
  <div class="ring-compare-container">
    <svg :width="width" :height="height" viewBox="0 0 480 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2B8EF3" />
          <stop offset="100%" stop-color="#47E4E5" />
        </linearGradient>
        <linearGradient id="blueGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#E7C767" />
          <stop offset="100%" stop-color="#F5784F" />
        </linearGradient>
      </defs>
      <!-- 蓝色部分 -->
      <path :d="bluePath" fill="none" stroke="url(#blueGradient)" stroke-width="30" stroke-linecap="round" />
      <!-- 橙色部分 -->
      <path :d="orangePath" fill="none" stroke="url(#blueGradient1)" stroke-width="30" stroke-linecap="round" />
      <!-- 中间文字 -->
      <text
        class="svg-text"
        x="200"
        y="110"
        text-anchor="middle"
        dominant-baseline="middle"
        fill="#FFFFFF"
        v-html="text"
      ></text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  bluePercent: number; // 蓝色部分占比（0-100）
  orangePercent: number; // 橙色部分占比（0-100）
  text?: string; // 中间显示的文字
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  text: "月对比",
  width: 400,
  height: 200,
});

// 计算蓝色部分的路径
const bluePath = computed(() => {
  const startAngle = 180;
  const endAngle = startAngle + (props.bluePercent * 180) / 100;
  const radius = 150;
  const cx = 200;
  const cy = 150;

  const startX = cx + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = cy + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = cx + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = cy + radius * Math.sin((endAngle * Math.PI) / 180);

  return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
});

// 计算橙色部分的路径
const orangePath = computed(() => {
  const startAngle = 180 + (props.bluePercent * 180) / 100;
  const endAngle = startAngle + (props.orangePercent * 180) / 100;
  const radius = 150;
  const cx = 200;
  const cy = 150;

  const startX = cx + radius * Math.cos((startAngle * Math.PI) / 180);
  const startY = cy + radius * Math.sin((startAngle * Math.PI) / 180);
  const endX = cx + radius * Math.cos((endAngle * Math.PI) / 180);
  const endY = cy + radius * Math.sin((endAngle * Math.PI) / 180);

  return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
});
</script>

<style scoped lang="scss">
.ring-compare-container {
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  //   padding: 20px;
}
.svg-text {
  text-align: center;

  /* 二级标题投影 */
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
  font-family: "Alimama FangYuanTi VF";
  font-size: 42px;
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
