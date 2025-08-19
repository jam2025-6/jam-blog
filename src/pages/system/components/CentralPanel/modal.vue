<script setup lang="ts">
interface Props {
  title?: string;
  position?: Record<string, string>;
  list?: Array<{
    name: string;
    value: number;
    unit: string;
  }>;
}
// 设置默认props值
const props = withDefaults(defineProps<Props>(), {
  title: "标题",
  list: () => [
    {
      name: "充电功率",
      value: 12.4,
      unit: "kW",
    },
    {
      name: "储能SOC",
      value: 94,
      unit: "%",
    },
  ],
});
</script>
<template>
  <div
    class="modal"
    :class="{ left: !!props.position?.right, right: !!props.position?.left }"
    :style="{
      ...props.position,
    }"
  >
    <div class="modal-title">
      <div class="text">{{ props.title }}</div>
      <slot name="right"> </slot>
    </div>
    <div class="modal-content">
      <div v-for="item in props.list" :key="item.name" class="item">
        <div class="name">{{ item.name }}</div>
        <div class="value">{{ item.value }}</div>
        <div class="unit">{{ item.unit }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  min-width: 110px;
  padding: 12px 16px;
  min-height: 58px;
  // border: 1px solid #236bab;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: 0 0 3px 0 rgba(133, 203, 214, 0.14);
  backdrop-filter: blur(12px);
  position: absolute;
  width: max-content;
  &.left {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid transparent;
      background: linear-gradient(to left, #05305d, #236bab) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      pointer-events: none;
      z-index: 1;
    }
  }
  &.right {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid transparent;
      background: linear-gradient(to right, #05305d, #236bab) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      pointer-events: none;
      z-index: 1;
    }
  }
  /* 宽度自适应内容 */
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;

    .text {
      text-align: center;
      /* 橙色文字投影 */
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(249, 243, 229, 0.36), 0 0 10px rgba(229, 145, 48, 0.6);
      font-family: "Alimama FangYuanTi VF";
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 1.8px;
      background: linear-gradient(211deg, #fcfbf7 18.65%, #f5e6cb 94.38%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .right {
    }
  }

  &-content {
    .item {
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 0 8px;
      color: #fff;
      /* 蓝色文字发光 */
      text-shadow: 0 0 6.8px rgba(64, 182, 232, 0.7);
      font-family: "HarmonyOS Sans SC";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 1.2px;

      &:last-child {
        margin-bottom: 0;
      }

      .value {
        font-weight: 700;
      }
    }
  }
}
</style>
