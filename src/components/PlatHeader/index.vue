<script setup lang="ts">
import { ref } from "vue";
import SelectSvg from "@/assets/icons/select.svg";
import SearchSvg from "@/assets/icons/search.svg";
const selectedValue = ref(null);
const options = [
  { value: "1", label: "选项1" },
  { value: "2", label: "选项2" },
];
</script>
<template>
  <div class="plat-header">
    <img class="logo" src="@/assets/images/global/logo.png" alt="" />
    <header class="plat-title">
      高特微电网管理平台
      <img src="@/assets/images/headers/title-back.png" alt="" />
    </header>
    <div class="search">
      <el-select
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
      </el-select>
      <el-input
        style="width: 188px; height: 38px"
        v-model="selectedValue"
        size="large"
        placeholder="输入电站名，enter 搜索"
        :prefix-icon="SearchSvg"
      />
    </div>
    <div class="time">
      <div class="time-text">17:06:42</div>
      <div class="week">
        <div class="week-text">星期五</div>
        <div class="date">2023/05/05</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.plat-header {
  height: 96px;
  background-image: url("@/assets/images/headers/plat-header.png");
  background-repeat: no-repeat; /* 禁止重复 */
  background-attachment: fixed; /* 可选：固定背景不随滚动移动 */
  display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  position: relative;
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
    width: 138px;
    height: 60px;
    margin-top: 18px;

    margin-right: 43px;
  }
  .plat-title {
    leading-trim: both;
    text-edge: cap;
    margin-top: 27px;
    /* 一级标题投影 */
    text-shadow: 0 0 6px rgba(229, 239, 249, 0.36), 0 0 25px rgba(48, 126, 229, 0.6);
    font-family: "Alimama FangYuanTi VF";
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
    > img {
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
