<script setup lang="ts">
import { ref, onMounted } from "vue";
// 定义props接口
interface Props {
  list?: { label: string; value: string }[];
  modelValue: string; // 这里是 v-model 绑定的值类型
}
// 设置默认props值
const props = withDefaults(defineProps<Props>(), {
  list: () => [{ label: "负荷预测曲线", value: "负荷预测曲线" }], // 默认值
  modelValue: "负荷预测曲线",
});
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
const currentIndex = ref("负荷预测曲线");
function clickItem(val: string) {
  currentIndex.value = val;
  emit("update:modelValue", val);
}
onMounted(() => {
  if (props.list && props.list.length) {
    const obj = props.list[0];
    clickItem(obj.value);
  }
});
</script>
<template>
  <div class="tabs">
    <div
      class="tabs-item"
      v-for="item in props.list"
      :key="item.value"
      @click="clickItem(item.value)"
      :class="{
        active: currentIndex === item.value,
      }"
    >
      <div class="name">{{ item.label }}</div>
    </div>
    <!-- <div
      class="tabs-item"
      @click="clickItem('发电预测曲线')"
      :class="{
        active: currentIndex === '发电预测曲线',
      }"
    >
      <div class="name">发电预测曲线</div>
    </div>
    <div
      class="tabs-item"
      @click="clickItem('现货价格预测')"
      :class="{
        active: currentIndex === '现货价格预测',
      }"
    >
      <div class="name">现货价格预测</div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  display: flex;
  gap: 0 12px;
  position: absolute;
  right: 3px;
  top: 1px;
  z-index: 2025;
  &-item {
    width: 109px;
    cursor: pointer;
    height: 30px;
    background-image: url("@/assets/icons/tabs.svg");
    opacity: 0.7;
    .name {
      background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      /* 二级标题投影 */
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
      font-family: "HarmonyOS Sans SC";
      font-size: 12px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
      letter-spacing: 0.96px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.active {
      position: relative;
      opacity: 1 !important;
      &::before {
        content: "";
        display: inline-block;
        width: 98px;
        height: 13px;
        position: absolute;
        bottom: 0;
        left: 5.5px;
        background-image: url("@/assets/icons/tabs-bottom.svg") !important;
      }
      .name {
        background: linear-gradient(211deg, #f7fcfa 18.65%, #e2ecff 94.38%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
