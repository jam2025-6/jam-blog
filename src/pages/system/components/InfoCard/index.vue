<script setup lang="ts">
import { useLocaleStore } from "@/stores/modules/locale.js";
import { storeToRefs } from "pinia";
const { isChinese } = storeToRefs(useLocaleStore());
</script>
<template>
  <div
    class="info-card"
    :class="{
      en: !isChinese,
    }"
  >
    <div class="item">
      <div class="item-title">{{ $t("peakValleyArbitrage") }}</div>
      <div class="item-section">
        <div class="flex">
          <div class="flex-point"></div>
          <div class="flex-name">{{ $t("monthlyElectricitySavings") }}</div>
          <div class="flex-num">405</div>
          <div class="flex-unit">{{ $t("yuan") }}</div>
        </div>
        <div class="flex orange">
          <div class="flex-point"></div>
          <div class="flex-name">{{ $t("cumulativeElectricitySavings") }}</div>
          <div class="flex-num">405</div>
          <div class="flex-unit">{{ $t("yuan") }}</div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">{{ $t("demandManagement") }}</div>
      <div class="item-section">
        <div class="flex">
          <div class="flex-point"></div>
          <div class="flex-name">{{ $t("monthlyDemandReduction") }}</div>
          <div class="flex-num">405</div>
          <div class="flex-unit">kW</div>
        </div>
        <div class="flex orange">
          <div class="flex-point"></div>
          <div class="flex-name">{{ $t("monthlyElectricitySavings") }}</div>
          <div class="flex-num">405</div>
          <div class="flex-unit">{{ $t("yuan") }}</div>
        </div>
        <div class="flex orange">
          <div class="flex-point"></div>
          <div class="flex-name">{{ $t("cumulativeElectricitySavings") }}</div>
          <div class="flex-num">405</div>
          <div class="flex-unit">{{ $t("yuan") }}</div>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">{{ $t("renewableEnergyUtilization") }}</div>
      <div class="item-section">
        <div class="flex">
          <div class="flex-point"></div>
          <div class="flex-name">{{ $t("monthlyUtilizedEnergy") }}</div>
          <div class="flex-num">405</div>
          <div class="flex-unit">MW·h</div>
        </div>
        <div class="flex orange">
          <div class="flex-point"></div>
          <div class="flex-name">{{ $t("cumulativeElectricitySavings") }}</div>
          <div class="flex-num">405</div>
          <div class="flex-unit">{{ $t("yuan") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-card {
  width: 910px;
  height: 80px;
  position: absolute;
  // background-color: #fff;
  top: 682px;
  left: 509px;
  right: 501px;
  display: flex;
  justify-content: center;
  gap: 0 28px;
  &.en {
    .item {
      &-section {
        .flex {
          padding: 0 8px;
          &-point {
            margin-right: 4px;
          }
          &-name {
            letter-spacing: 0;
          }
        }
      }
    }
  }
  .item {
    width: 262px;
    min-height: 80px;
    padding-top: 12px;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      bottom: 0;
      width: 262px;
      height: 85px;
      z-index: -1;
      background-image: url("@/assets/images/system/card.png");
    }
    &-title {
      background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      /* 二级标题投影 */
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
      font-family: "Alimama FangYuanTi VF";
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 1.2px;
      margin-bottom: 7px;
    }
    &-section {
      .flex {
        padding-left: 45px;
        display: flex;
        align-items: center;
        justify-content: left;
        height: 14px;
        margin-bottom: 6px;
        &:last-child {
          margin-bottom: 0;
        }
        &.orange {
          .flex-point {
            background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
          }
          .flex-num {
            background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        &-point {
          background: linear-gradient(220deg, #26cefd 7.64%, #2b8ef3 100.06%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 11px;
        }
        &-name {
          /* 二级标题投影 */
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
          font-family: "HarmonyOS Sans SC";
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.6px;
          margin-right: 6px;
          background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        &-num {
          background: linear-gradient(220deg, #26cefd 7.64%, #2b8ef3 100.06%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: Rubik;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.4px;
          margin-right: 4px;
        }
        &-unit {
          background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          /* 二级标题投影 */
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
          font-family: "HarmonyOS Sans SC";
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: 0.6px;
        }
      }
    }
  }
}
</style>
