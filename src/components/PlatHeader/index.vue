<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import dayjs from "dayjs";
import SearchSvg from "@/assets/icons/search.svg";
import { useLocaleStore } from "@/stores/modules/locale";
import { getMicrogridBigScreenName } from '@/api/home'
import { storeToRefs } from "pinia";
import bus from "@/utils/bus";
const { isChinese } = storeToRefs(useLocaleStore());
const formData = ref({
  stationName: "",
  microgridName: "",
});
// 响应式变量
const currentDate = ref("");
const currentTime = ref("");
const currentWeekday = ref("");

// 星期数组
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

// 更新时间函数
function updateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  currentDate.value = `${year}/${month}/${day}`;

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  currentTime.value = `${hours}:${minutes}:${seconds}`;

  currentWeekday.value = `星期${weekDays[now.getDay()]}`;
}
let timer: ReturnType<typeof setInterval>;
const title = ref('')
function search() {
  bus.emit("globalSearch", formData.value);
}
const logoUrl = computed(() => {
  return sessionStorage.getItem("logoUrl") || 'https://ess-ds.com/statics/2025/05/12/20250512181338A498_a22542a93c9c41b3bd853296fcda624e.png'
});

// 返回saas首页
function handleBack() {
  location.href = location.origin
}
function getTitle() {
  getMicrogridBigScreenName().then(res => {
    if (res.data) {
      title.value = res.data.config
    }
  })
}
onMounted(() => {
  getTitle()
  updateTime(); // 立即执行一次
  timer = setInterval(updateTime, 1000); // 每秒更新
});

onUnmounted(() => {
  clearInterval(timer); // 清理定时器
});
</script>
<template>
  <div class="plat-header" :class="{
    en: !isChinese,
  }">
    <img class="logo" :src="logoUrl" alt="" />
    <header @click="handleBack" class="plat-title" :style="{
      fontSize: Math.min(48 - title.length, 36) + 'px'
    }">
      {{ title || '微电网管理平台' }} <img src="@/assets/images/headers/title-back.png" alt="" />
    </header>
    <div class="search">
      <!-- <el-select
        style="width: 188px; height: 38px"
        v-model="selectedValue"
        :suffix-icon="SelectSvg"
        placeholder="某某字段"
      >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select
        style="width: 188px; height: 38px"
        v-model="selectedValue"
        :suffix-icon="SelectSvg"
        placeholder="某某字段"
      >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select> -->
      <!-- <span class="search-label">微电网</span> -->
      <el-input style="width: 208px; height: 38px" v-model="formData.microgridName" size="large" clearable
        :placeholder="$t('searchMicrogridPrompt')" :prefix-icon="SearchSvg" @change="search" />
      <!-- <span class="search-label">站点名称</span> -->
      <el-input style="width: 188px; height: 38px" v-model="formData.stationName" size="large" clearable
        :placeholder="$t('search_prompt')" :prefix-icon="SearchSvg" @change="search" />
    </div>
    <div class="time">
      <div class="time-text">{{ dayjs(currentDate + currentTime).format($t("format.time")) }}</div>
      <div class="week">
        <div class="week-text">{{ $t(`week.${currentWeekday}`) }}</div>
        <div class="date">{{ dayjs(currentDate).format($t("format.day")) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.plat-header {
  height: 96px;
  background-image: url("@/assets/images/headers/plat-header.png");
  background-repeat: no-repeat;
  /* 禁止重复 */
  background-attachment: fixed;
  /* 可选：固定背景不随滚动移动 */
  display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  position: relative;

  &.en {
    .plat-title {
      font-size: 22px;
      letter-spacing: 1.5px;
    }
  }

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    background: url("@/assets/images/headers/header-line.png");
    left: 725px;
    top: 42px;
    width: 97px;
    height: 29px;
  }

  .logo {
    margin-left: 36px;
    // width: 138px;
    height: 48px;
    margin-top: 18px;

    margin-right: 43px;
  }

  .plat-title {
    cursor: pointer;
    leading-trim: both;
    text-edge: cap;
    margin-top: 27px;
    /* 一级标题投影 */
    text-shadow: 0 0 6px rgba(229, 239, 249, 0.36), 0 0 25px rgba(48, 126, 229, 0.6);
    font-family: "Alimama FangYuanTi VF";
    font-variation-settings: "BEVL" 1, "wght" 700;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 4px;
    background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;

    >img {
      margin-top: 0px;
      margin-left: 12px;
      width: 29px;
      height: 25px;
    }
  }

  .search {
    flex: 1;
    margin-top: 54px;
    margin-right: 58px;
    display: flex;
    justify-content: flex-end;
    gap: 0 24px;
    // &-label {
    //   line-height: 38px;
    //   color: #fff;
    // }
  }

  .time {
    /* 标题发光 */
    display: flex;
    margin-right: 56px;
    margin-top: 54px;

    &-text {
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 2.4px;
      margin-right: 18px;
      text-shadow: 0 0 6.8px rgba(0, 114, 236, 0.43), 0 0 25px rgba(64, 223, 232, 0.6);
      font-family: "HarmonyOS Sans SC";
      background: #e7f2f2;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .week {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 1.2px;
      text-shadow: 0 0 6.8px rgba(0, 114, 236, 0.43), 0 0 25px rgba(64, 223, 232, 0.6);
      font-family: "HarmonyOS Sans SC";
      background: #e7f2f2;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
