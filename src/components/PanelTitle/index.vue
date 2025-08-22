<script setup lang="ts">
// 定义props接口
interface Props {
  title?: string;
  size?: string;
}

// 设置默认props值
const props = withDefaults(defineProps<Props>(), {
  title: "基本信息", // 默认值
  size: "small", //背景图大小
});
</script>

<template>
  <div class="panel-title" :class="[props.size]">
    <div class="title">
      {{ props.title }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.panel-title {
  height: 42px;
  width: 100%;
  background-repeat: no-repeat;
  padding-left: 52px;
  padding-top: 3px;
  &.small {
    background-image: url("@/assets/images/system/title-bg.png");
  }
  &.large {
    background-image: url("@/assets/images/system/title-bg-large.png");
  }
  .title {
    /* 二级标题投影 */

    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 240, 249, 0.36), 0 0 10px rgba(48, 139, 229, 0.6);
    font-family: "Alimama FangYuanTi VF";
    font-variation-settings: "BEVL" 1, "wght" 700;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.8px;
    background: linear-gradient(211deg, #f7fbfc 18.65%, #f7fbfc 94.38%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
