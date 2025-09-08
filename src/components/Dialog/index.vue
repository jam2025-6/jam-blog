<template>
  <div v-if="currentVisible">
    <!-- 遮罩层 -->
    <div class="bg-black" @click="onClose"></div>

    <!-- 弹框内容 -->
    <div class="dialog">
      <div class="dialog-title">
        <div class="text">{{ props.title || '选择跳转的站点' }}</div>
        <button class="clase" style="color: #B1C4E6;" @click="onClose">✕</button>
      </div>
      <div style="padding: 16px 0 0 0;">
        <slot />
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Props {
  title?: string,
  visible?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '弹框名称',
  visible: false
});
const emit = defineEmits(['update:visible'])
const currentVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  },
});
function onClose() {
  currentVisible.value = false
}
</script>

<style scoped lang="scss">
.bg-black {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
}

.dialog {
  position: fixed;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 35%;
  min-width: 569px;
  // height: 582px;
  min-height: 132px;
  flex-shrink: 0;
  border-radius: 12px;
  border: none !important;
  background: linear-gradient(180deg, rgba(5, 17, 42, 0.02) 0%, rgba(15, 75, 156, 0.03) 100%);
  backdrop-filter: blur(24px);
  z-index: 9999;
  padding: 24px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid transparent;
    border-radius: 12px;
    background: linear-gradient(to top right, #286be633, #68bbff) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 1;
  }

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
      leading-trim: both;
      text-edge: cap;
      /* 二级标题投影 */
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.40), 0 0 6px rgba(229, 240, 249, 0.36), 0 0 10px rgba(48, 139, 229, 0.60);
      font-family: "Alimama FangYuanTi VF";
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 1.8px;
      background: linear-gradient(211deg, #F7FBFC 18.65%, #CBE1F5 94.38%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
