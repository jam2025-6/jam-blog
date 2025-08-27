<script setup lang="ts">
import { useLocaleStore } from "@/stores/modules/locale";
import { storeToRefs } from "pinia";
const { isChinese } = storeToRefs(useLocaleStore());
</script>
<template>
  <div
    class="system-header"
    :class="{
      en: !isChinese,
    }"
  >
    <img class="logo" src="@/assets/images/global/logo.png" alt="" />
    <div class="title">{{ $t("gaoteMicrogridManagementSystem") }}</div>
  </div>
</template>

<style scoped lang="scss">
.system-header {
  height: 96px;
  background-image: url("@/assets/images/system/bg.png");
  background-repeat: no-repeat; /* 禁止重复 */
  background-attachment: fixed; /* 可选：固定背景不随滚动移动 */
  display: flex;
  justify-content: center;
  //   align-items: center;
  //   justify-content: space-between;
  position: relative;
  &.en {
    .title {
      font-size: 28px;
    }
  }
  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    background: url("@/assets/images/system/title-bottom.svg");
    left: 918px;
    top: 84px;
    width: 86px;
    height: 11px;
  }
  .logo {
    left: 36px;
    width: 138px;
    height: 60px;
    margin-top: 18px;
    position: absolute;
    margin-right: 43px;
  }
  .title {
    leading-trim: both;
    text-edge: cap;
    margin-top: 26px;
    /* 一级标题投影 */
    text-shadow: 0 0 6px rgba(229, 239, 249, 0.36), 0 0 25px rgba(48, 126, 229, 0.6);
    font-family: "Alimama FangYuanTi VF";
    font-size: 36px;
    font-style: normal;
    line-height: normal;
    font-weight: 700;
    font-variation-settings: "BEVL" 1, "wght" 700;
    letter-spacing: 5.04px;
    background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      background: url("@/assets/images/system/title-left.png");
      left: -51px;
      top: 0;
      width: 39px;
      height: 22px;
    }
    &::after {
      content: "";
      display: inline-block;
      position: absolute;
      background: url("@/assets/images/system/title-right.png");
      right: -51px;
      top: 0;
      width: 39px;
      height: 22px;
    }
  }
}
</style>
