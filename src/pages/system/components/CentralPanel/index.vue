<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from "vue-i18n";
import { useLocaleStore } from "@/stores/modules/locale";
import { storeToRefs } from "pinia";
const { isChinese } = storeToRefs(useLocaleStore());
const { t } = useI18n();
import Line from "./line.vue";
import Modal from "./modal.vue";
import { Dialog } from "@/components";
import { useRoute, useRouter } from 'vue-router';
import { getSwitchCentralized } from '@/api/system'
import { StationInfo } from '@/types/system'
const route = useRoute()
const router = useRouter()
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
    name: "实时功率",
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
    name: "实时功率",
    value: 12.4,
    unit: "kW",
  },
  {
    name: t("dailyGeneration"),
    value: 12.4,
    unit: "kW·h",
  },
  // {
  //   name: t("dailyRevenue"),
  //   value: 94,
  //   unit: t("yuan"),
  // },
];
const modal3 = [
  // {
  //   name: t("gridFeedIn"),
  //   value: 12.4,
  //   unit: "kW·h",
  // },
  {
    name: "实时功率",
    value: 12.4,
    unit: "kW",
  },
  {
    name: t("dailyUtilization"),
    value: 12.4,
    unit: "kW·h",
  },
  // {
  //   name: t("dailyRevenue"),
  //   value: 94,
  //   unit: t("yuan"),
  // },
];
const modal4 = [
  {
    name: "实时功率",
    value: 12.4,
    unit: "kW",
  },
  {
    name: t("dailyConsumption"),
    value: 12.4,
    unit: "kW·h",
  },
];
const modal5 = [
  {
    name: "实时功率",
    value: 12.4,
    unit: "kW",
  },
  {
    name: t("dailyCharging"),
    value: 12.4,
    unit: "kW·h",
  },
  // {
  //   name: t("dailyChargingRevenue"),
  //   value: 94,
  //   unit: t("yuan"),
  // },
];
const modal6 = [
  {
    name: "实时功率",
    value: 12.4,
    unit: "kW",
  },
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
const showDialog = ref(false)
const stationList = ref<StationInfo[]>([])
async function clickGraphic() {
  getStations()
  showDialog.value = true
}
async function getStations() {
  const id = route.query.id as string;
  if (!id) {
    return;
  }
  let res = await getSwitchCentralized(id)
  stationList.value = res.data
}
function clickStationItem(val: StationInfo) {
  const encoded = btoa(
    encodeURIComponent(
      JSON.stringify({
        stationCode: val.stationCode,
        viewId: val.layoutId,
        stationName: val.stationName,
        type: val.stationType,
      })
    )
  );
  const baseUrl = import.meta.env.VITE_APP_ENV === "development" ? 'https://test.ess-ds.com' : ''
  showDialog.value = false
  window.open(`${baseUrl}/nlgl-web/stationInfo?q=${encoded}`)
}
</script>
<template>
  <Dialog @update:visible="showDialog = false" title="选择跳转的站点" v-model:visible="showDialog">
    <div class="station-item" @click="clickStationItem(item)" v-for="item, index in stationList" :key=item.stationCode>
      <div class="index">{{ index + 1 }}</div>
      <div class="name">{{
        item.stationName }}</div>
      <div class="enter">进入</div>
    </div>
  </Dialog>
  <div class="center-panel" :class="{
    en: !isChinese,
  }">
    <Line :status="true" :points="point1" />
    <Line :status="true" :points="point2" />
    <Line :status="true" :points="point3" />
    <Line :status="true" :bgForward="false" :points="point4" />
    <Line :status="true" :bgForward="false" :points="point5" />
    <Line :status="true" :bgForward="false" :points="point6" />
    <Modal :title="$t('energyStorage')" :list="modal1" :position="{ right: '807px', top: '149px' }">
      <template #right>
        <div class="status">
          <div class="status-circle"></div>
          <div class="status-text">充电</div>
        </div>
      </template>
    </Modal>
    <Modal :title="$t('windPower')" :list="modal2" :position="{ right: '617px', top: '0' }" />
    <Modal :title="$t('photovoltaic')" :list="modal3"
      :position="{ left: isChinese ? '784px' : '764px', top: '70px' }" />
    <Modal :title="$t('load')" :list="modal4" :position="{ left: '786px', top: '245px' }" />
    <Modal :title="$t('chargingPile')" :list="modal5" :position="{ left: '603px', top: '367px' }" />
    <Modal :title="$t('gridPower')" :list="modal6"
      :position="{ right: isChinese ? '796px' : '777px', top: isChinese ? '348px' : '288px' }" />
    <div class="energy-storage scale-item" @click="clickGraphic">
      <img src="@/assets/images/station/energyStorage-active.png" alt="" />
    </div>
    <div class="wind-power scale-item" @click="clickGraphic">
      <img src="@/assets/images/station/windPower-active.png" alt="" />
      <!-- <div class="name">风电</div> -->
    </div>
    <div class="photovoltaic scale-item" @click="clickGraphic">
      <img src="@/assets/images/station/photovoltaic-active.png" alt="" />
      <!-- <div class="name">光伏</div> -->
    </div>
    <div class="load scale-item" @click="clickGraphic">
      <img src="@/assets/images/station/load-active.png" alt="" />
      <!-- <div class="name">负荷</div> -->
    </div>
    <div class="charging-pile scale-item" @click="clickGraphic">
      <img src="@/assets/images/station/chargingPile-active.png" alt="" />
      <!-- <div class="name">充电桩</div> -->
    </div>
    <div class="electric-supply scale-item" @click="clickGraphic">
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
.station-item {
  height: 44px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid transparent;
  justify-content: space-between;

  .index {
    width: 76px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
  }

  .name {
    color: #E0F0FF;
    leading-trim: both;
    text-edge: cap;
    font-family: "HarmonyOS Sans SC";
    font-size: 18px;
    font-style: normal;
    flex: 1;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.44px;
  }

  .enter {
    color: #B6D4FE;
    leading-trim: both;
    text-edge: cap;
    font-family: "HarmonyOS Sans SC";
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.44px;
    padding-right: 16px;
    display: none;
  }

  &:hover {
    // background-color: rgba($color: #1a417e, $alpha: 0.25) !important;
    border: 1px solid #68BBFF;
    background: rgba(36, 87, 164, 0.40);

    .enter {
      display: inline-block;
    }
  }
}

.status {
  display: flex;
  align-items: center;

  &-circle {
    width: 6px;
    height: 6px;
    background: #00ff37;
    border-radius: 50%;
    margin-right: 10px;
  }

  &-text {
    color: #dfe8e0;

    /* 绿色文字投影 */
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 249, 242, 0.36), 0 0 10px rgba(48, 229, 184, 0.6);
    font-family: "HarmonyOS Sans SC";
    font-size: 12px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: 1.2px;
  }
}

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

  .scale-item {
    transition: transform 0.5s ease;
    cursor: pointer;
    z-index: 2025;

    /* 0.3秒平滑过渡 */
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
