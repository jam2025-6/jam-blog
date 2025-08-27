<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useLocaleStore } from "@/stores/modules/locale";
import { storeToRefs } from "pinia";
const { isChinese } = storeToRefs(useLocaleStore());
const { t } = useI18n();
import Line from "./line.vue";
import Modal from "./modal.vue";
const point1 = [
  { x: 442, y: 448 },
  { x: 698, y: 300 },
  { x: 698, y: 250 },
];
const point2 = [
  { x: 480, y: 250 },
  { x: 635, y: 336 },
  { x: 705, y: 297 },
  { x: 705, y: 245 },
];
const point3 = [
  { x: 655, y: 425 },
  { x: 568, y: 374 },
  { x: 712, y: 293 },
  { x: 712, y: 240 },
];
const point4 = [
  { x: 730, y: 100 },
  { x: 890, y: 190 },
  { x: 719, y: 289 },
  { x: 719, y: 220 },
];
const point5 = [
  { x: 980, y: 140 },
  { x: 890, y: 190 },
  { x: 726, y: 285 },
  { x: 726, y: 220 },
];
const point6 = [
  { x: 945, y: 250 },
  { x: 865, y: 205 },
  { x: 732, y: 281 },
  { x: 732, y: 220 },
];
const modal1 = [
  {
    name: t("chargingPower"),
    value: 12.4,
    unit: "kW",
  },
  {
    name: t("essSOC"),
    value: 94,
    unit: "%",
  },
];
const modal2 = [
  {
    name: t("dailyGeneration"),
    value: 12.4,
    unit: "kW·h",
  },
  {
    name: t("dailyRevenue"),
    value: 94,
    unit: t("yuan"),
  },
];
const modal3 = [
  {
    name: t("gridFeedIn"),
    value: 12.4,
    unit: "kW·h",
  },
  {
    name: t("dailyUtilization"),
    value: 12.4,
    unit: "kW·h",
  },
  {
    name: t("dailyRevenue"),
    value: 94,
    unit: t("yuan"),
  },
];
const modal4 = [
  {
    name: t("dailyConsumption"),
    value: 12.4,
    unit: "kW·h",
  },
];
const modal5 = [
  {
    name: t("dailyCharging"),
    value: 12.4,
    unit: "kW·h",
  },
  {
    name: t("dailyChargingRevenue"),
    value: 94,
    unit: t("yuan"),
  },
];
const modal6 = [
  {
    name: t("gridFeedIn"),
    value: 12.4,
    unit: "kW·h",
  },
  {
    name: t("gridDraw"),
    value: 12.4,
    unit: "kW·h",
  },
];
</script>
<template>
  <div
    class="center-panel"
    :class="{
      en: !isChinese,
    }"
  >
    <Line :status="true" :points="point1" />
    <Line :status="true" :points="point2" />
    <Line :status="true" :points="point3" />
    <Line :status="true" :bgForward="false" :points="point4" />
    <Line :status="true" :bgForward="false" :points="point5" />
    <Line :status="true" :bgForward="false" :points="point6" />
    <Modal :title="$t('energyStorage')" :list="modal1" :position="{ right: '807px', top: '149px' }" />
    <Modal :title="$t('windPower')" :list="modal2" :position="{ right: '617px', top: '0' }" />
    <Modal
      :title="$t('photovoltaic')"
      :list="modal3"
      :position="{ left: isChinese ? '784px' : '764px', top: '70px' }"
    />
    <Modal :title="$t('load')" :list="modal4" :position="{ left: '786px', top: '245px' }" />
    <Modal :title="$t('chargingPile')" :list="modal5" :position="{ left: '603px', top: '367px' }" />
    <Modal
      :title="$t('gridPower')"
      :list="modal6"
      :position="{ right: isChinese ? '796px' : '777px', top: isChinese ? '348px' : '288px' }"
    />
    <div class="energy-storage">
      <img src="@/assets/images/station/energyStorage-active.png" alt="" />
    </div>
    <div class="wind-power">
      <img src="@/assets/images/station/windPower-active.png" alt="" />
      <!-- <div class="name">风电</div> -->
    </div>
    <div class="photovoltaic">
      <img src="@/assets/images/station/photovoltaic-active.png" alt="" />
      <!-- <div class="name">光伏</div> -->
    </div>
    <div class="load">
      <img src="@/assets/images/station/load-active.png" alt="" />
      <!-- <div class="name">负荷</div> -->
    </div>
    <div class="charging-pile">
      <img src="@/assets/images/station/chargingPile-active.png" alt="" />
      <!-- <div class="name">充电桩</div> -->
    </div>
    <div class="electric-supply">
      <img src="@/assets/images/station/electricSupply-active.png" alt="" />
      <!-- <div class="name">市电</div> -->
    </div>
    <div class="advertising-board">
      <img src="@/assets/images/station/advertisingBoard.png" alt="" />
      <div class="value">
        <div class="name">{{ $t("renewableEnergyPercentage") }}</div>
        <div class="num">89%</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.center-panel {
  width: 955px;
  height: 450px;
  // background-color: #fff;
  position: absolute;
  left: 472px;
  top: 203px;
  right: 493px;
  &.en {
    .advertising-board {
      .value {
        left: 15px;
        transform: translateY(-60%) skew(0deg, -30deg);
        .num {
          transform: translate(-10px, 4px);
        }
      }
    }
  }
  .energy-storage {
    position: absolute;
    left: 157px;
    top: 96px;
    .name {
      transform: skew(75deg, -55deg) rotate(20deg);
      text-align: center;
      /* 橙色文字投影 */
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1), 0 0 6px rgba(249, 243, 229, 0.36), 0 0 10px rgba(229, 145, 48, 0.6);
      font-family: "Alimama FangYuanTi VF";
      font-variation-settings: "BEVL" 1, "wght" 700;
      font-size: 6px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.8px;
      background: linear-gradient(211deg, #fcfbf7 18.65%, #f5e6cb 94.38%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: absolute;
      right: 80px;
      bottom: 6px;
    }
  }
  .wind-power {
    position: absolute;
    left: 342px;
    top: -27px;
  }
  .photovoltaic {
    position: absolute;
    left: 603px;
    top: 27px;
  }
  .load {
    position: absolute;
    left: 604px;
    top: 217px;
  }
  .charging-pile {
    position: absolute;
    left: 396px;
    top: 267px;
  }
  .electric-supply {
    position: absolute;
    left: 178px;
    top: 244px;
  }
  .advertising-board {
    position: absolute;
    left: 373px;
    top: 10px;
    .value {
      transform: translateY(-50%) skew(0deg, -29deg);
      position: absolute;
      top: 50%;
      left: 21px;
      display: flex;
      align-items: center;
      .name {
        text-align: center;
        background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        /* 二级标题投影 */
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
        font-family: "Alimama FangYuanTi VF";
        font-variation-settings: "BEVL" 1, "wght" 700;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1.4px;
        margin-right: 5px;
      }
      .num {
        background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        /* 橙色文字投影 */
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(249, 243, 229, 0.36), 0 0 10px rgba(229, 145, 48, 0.6);
        font-family: Rubik;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1.2px;
      }
    }
  }
}
</style>
