<script setup lang="ts">
import { computed } from 'vue'
import { useLocaleStore } from "@/stores/modules/locale";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { isChinese } = storeToRefs(useLocaleStore());
const router = useRouter()
const route = useRoute()
const logoUrl = computed(() => {
  return sessionStorage.getItem("logoUrl") || 'https://ess-ds.com/statics/2025/05/12/20250512181338A498_a22542a93c9c41b3bd853296fcda624e.png'
});
const title = computed(() => {
  return route.query.title || '' + t("gaoteMicrogridManagementSystem")
})
function goBack() {
  router.back()
}
</script>
<template>
  <div class="system-header" :class="{
    en: !isChinese,
  }">
    <img class="logo" :src="logoUrl" alt="" />
    <div class="title">{{ title }}</div>
    <div class="btn-list">
      <div class="text-btn" @click="goBack">返回</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.system-header {
  height: 96px;
  background-image: url("@/assets/images/system/bg.png");
  background-repeat: no-repeat;
  /* 禁止重复 */
  background-attachment: fixed;
  /* 可选：固定背景不随滚动移动 */
  display: flex;
  justify-content: center;
  position: relative;

  &.en {
    .title {
      font-size: 28px;
      letter-spacing: 3px;
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
    // width: 138px;
    height: 48px;
    margin-top: 18px;
    position: absolute;
    margin-right: 43px;
  }

  .btn-list {
    position: absolute;
    right: 36px;
    margin-top: 18px;
    // margin-right: 43px;

    .text-btn {
      leading-trim: both;
      text-edge: cap;
      cursor: pointer;
      /* 二级标题投影 */
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.40), 0 0 6px rgba(229, 240, 249, 0.36), 0 0 10px rgba(48, 139, 229, 0.60);
      font-family: "Alimama FangYuanTi VF";
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 1.8px;
      background: linear-gradient(211deg, #F7FBFC 18.65%, #CBE1F5 94.38%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &:hover {
        background: rgba(48, 139, 229, 1);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
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
