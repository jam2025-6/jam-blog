<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from "vue-i18n";
import { useLocaleStore } from "@/stores/modules/locale";
import { storeToRefs } from "pinia";
import Line from "./line.vue";
import Modal from "./modal.vue";
import { Dialog } from "@/components";
import { useRoute, useRouter } from 'vue-router';
import { getSwitchCentralized } from '@/api/system'
import { StationInfo, EnergyData } from '@/types/system'
import { convertEnergy } from '@/utils/tools'
const route = useRoute()
const router = useRouter()
const { t } = useI18n();
const { isChinese } = storeToRefs(useLocaleStore());
interface Props {
  data?: EnergyData;
}
// 设置默认props值
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {
      pvcDayCapacity: 0,
      pvcDayConsumCapacity: 0,
      pvcDayConsumCapacityUnit: "MWh",
      pvcDayPower: 0,
      pvcDayPowerUnit: "kWh",
      loadDayConsumCapacity: 0,
      loadDayConsumCapacityUnit: "MWh",
      loadDayPower: 0,
      loadDayPowerUnit: "kWh",
      chargePileDayConsumCapacity: 0,
      chargePileDayConsumCapacityUnit: "kWh",
      chargePileDayPower: 0,
      chargePileDayPowerUnit: "kWh",
      municipalPowerGridCapacity: 0,
      municipalPowerGridCapacityUnit: "kWh",
      municipalPowerGridPower: 0,
      municipalPowerGridPowerUnit: "kWh",
      energyStorageChargingPower: 0,
      energyStorageChargingPowerUnit: "kWh",
      energyStorageSOC: 0,
      energyStorageSOCText: "0%",
      energyStorageStatus: -1,
      energyStorageStatusText: "未知",
      newEnergyProportion: "0%",
      peakValleyArbitrageMonthSaveElec: 0,
      peakValleyArbitrageMonthSaveElecUnit: "元",
      peakValleyArbitrageTotalSaveElec: 0,
      peakValleyArbitrageTotalSaveElecUnit: "元",
      demandManageMonthReduce: 0,
      demandManageMonthReduceUnit: "kWh",
      demandManageMonthSaveElec: 0,
      demandManageTotalSaveElec: 0,
      pvcMonthConsumCapacity: 0,
      pvcMonthConsumCapacityUnit: "kWh",
      pvcMonthConsumSaveElec: 0,
      pvcTotalConsumSaveElec: null
    }
  }, // 默认值
});
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
const modal1 = computed(() => [
  {
    name: t('realTimePower'),
    value: convertEnergy(+props.data.energyStorageChargingPower).value,
    unit: convertEnergy(+props.data.energyStorageChargingPower).unit,
  },
  {
    name: t("essSOC"),
    value: +props.data.energyStorageSOCText,
    unit: "%",
  },
]);
const modal2 = computed(() => [
  {
    name: t('realTimePower'),
    value: 123,
    unit: "kW",
  },
  {
    name: t("dailyGeneration"),
    value: 12.4,
    unit: "kW·h",
  },
]);
const modal3 = computed(() => [
  {
    name: t('realTimePower'),
    value: convertEnergy(props.data.pvcDayPower).value,
    unit: convertEnergy(props.data.pvcDayPower).unit,
  },
  {
    name: t("dailyUtilization"),
    value: convertEnergy(props.data.pvcDayConsumCapacity).value,
    unit: convertEnergy(props.data.pvcDayConsumCapacity).unit,
  },
]);
const modal4 = computed(() => [
  {
    name: t('realTimePower'),
    value: convertEnergy(props.data.loadDayPower).value,
    unit: convertEnergy(props.data.loadDayPower).unit,
  },
  {
    name: t("dailyConsumption"),
    value: convertEnergy(props.data.loadDayConsumCapacity).value,
    unit: convertEnergy(props.data.loadDayConsumCapacity).unit,
  },
]);
const modal5 = computed(() => [
  {
    name: t('realTimePower'),
    value: convertEnergy(props.data.chargePileDayPower).value,
    unit: convertEnergy(props.data.chargePileDayPower).unit,
  },
  {
    name: t("dailyCharging"),
    value: convertEnergy(props.data.chargePileDayConsumCapacity).value,
    unit: convertEnergy(props.data.chargePileDayConsumCapacity).unit,
  },
]);
const modal6 = computed(() => [
  {
    name: t('realTimePower'),
    value: convertEnergy(props.data.municipalPowerGridPower).value,
    unit: convertEnergy(props.data.municipalPowerGridPower).unit,
  },
  // {
  //   name: t("gridFeedIn"),
  //   value: props.data.chargePileDayPower,
  //   unit: props.data.chargePileDayPowerUnit,
  // },
  {
    name: t("gridDraw"),
    value: convertEnergy(props.data.municipalPowerGridCapacity).value,
    unit: convertEnergy(props.data.municipalPowerGridCapacity).unit,
  },
]);
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
  <Dialog @update:visible="showDialog = false" :title="$t('selectRedirectSite')" v-model:visible="showDialog">
    <div class="station-item" @click="clickStationItem(item)" v-for="item, index in stationList" :key=item.stationCode>
      <div class="index">{{ index + 1 }}</div>
      <div class="name">{{
        item.stationName }}</div>
      <div class="enter">{{ $t('enter') }}</div>
    </div>
  </Dialog>
  <div class="center-panel" :class="{
    en: !isChinese,
  }">

    <!-- 储能 >2往外流 <-2网内流 -->
    <Line :status="(+props.data.energyStorageChargingPower > 2) || (+props.data.energyStorageChargingPower < -2)"
      :forward="(+props.data.energyStorageChargingPower > 2)" :points="point2" />
    <!-- 充电桩 大于0往外流  -->
    <Line :status="+props.data.chargePileDayPower !== 0" :forward="false" :points="point3" />
    <!-- 市电 >0往外流 -->
    <Line :status="+props.data.municipalPowerGridPower !== 0" :forward="+props.data.municipalPowerGridPower > 0"
      :points="point1" />
    <!-- 负荷 大于0往外流 -->
    <Line :status="+props.data.loadDayPower !== 0" :forward="false" :bgForward="false" :points="point6" />
    <!-- 光伏 大于0往内流 -->
    <Line :status="+props.data.pvcDayPower !== 0" :bgForward="false" :points="point5" />
    <!-- 风电 目前没有-->
    <Line :status="false" :bgForward="false" :points="point4" />

    <Modal :title="$t('energyStorage')" :list="modal1" :position="{ right: '807px', top: '149px' }">
      <template #right>
        <div class="status">

          <div class="status-circle" :style="{
            background: +props.data.energyStorageStatus == 0
              ? '#BA781C'
              : +props.data.energyStorageStatus == 1
                ? '#1CBA21'
                : +props.data.energyStorageStatus == 2
                  ? '#4A87FF'
                  : +props.data.energyStorageStatus == 3
                    ? '#13BAD0'
                    : +props.data.energyStorageStatus == 4
                      ? '#FE7843'
                      : +props.data.energyStorageStatus == 5
                        ? '#7D43F1'
                        : +props.data.energyStorageStatus == 6
                          ? '#FF9F05'
                          : +props.data.energyStorageStatus == -1
                            ? '#808080'
                            : '#FF3B3B'
          }"></div>
          <div class="status-text" :style="{
            '--bg-color': +props.data.energyStorageStatus == 0
              ? '#BA781C'
              : +props.data.energyStorageStatus == 1
                ? '#1CBA21'
                : +props.data.energyStorageStatus == 2
                  ? '#4A87FF'
                  : +props.data.energyStorageStatus == 3
                    ? '#13BAD0'
                    : +props.data.energyStorageStatus == 4
                      ? '#FE7843'
                      : +props.data.energyStorageStatus == 5
                        ? '#7D43F1'
                        : +props.data.energyStorageStatus == 6
                          ? '#FF9F05'
                          : +props.data.energyStorageStatus == -1
                            ? '#808080'
                            : '#FF3B3B',
            '--color': +props.data.energyStorageStatus == 0
              ? '#F8F1E8'
              : +props.data.energyStorageStatus == 1
                ? '#E8F8E8'
                : +props.data.energyStorageStatus == 2
                  ? '#ECF2FF'
                  : +props.data.energyStorageStatus == 3
                    ? '#E7F8FA'
                    : +props.data.energyStorageStatus == 4
                      ? '#FEF1EC'
                      : +props.data.energyStorageStatus == 5
                        ? '#F1ECFD'
                        : +props.data.energyStorageStatus == 6
                          ? '#FFF5E6'
                          : +props.data.energyStorageStatus == -1
                            ? '#F2F2F2'
                            : '#FFEBEB',
            color: +props.data.energyStorageStatus == 0
              ? '#F8F1E8'
              : +props.data.energyStorageStatus == 1
                ? '#E8F8E8'
                : +props.data.energyStorageStatus == 2
                  ? '#ECF2FF'
                  : +props.data.energyStorageStatus == 3
                    ? '#E7F8FA'
                    : +props.data.energyStorageStatus == 4
                      ? '#FEF1EC'
                      : +props.data.energyStorageStatus == 5
                        ? '#F1ECFD'
                        : +props.data.energyStorageStatus == 6
                          ? '#FFF5E6'
                          : +props.data.energyStorageStatus == -1
                            ? '#F2F2F2'
                            : '#FFEBEB'
          }">{{ props.data.energyStorageStatusText }}</div>
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
        <div class="num">{{ props.data.newEnergyProportion }}</div>
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
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px var(--color), 0 0 10px var(--bg-color);
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
        font-size: 28px;
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
