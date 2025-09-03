<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { PanelTitle } from "@/components";
import { useLocaleStore } from "@/stores/modules/locale";
import { storeToRefs } from "pinia";
import { round } from "lodash";
import { useRoute } from "vue-router";
import { getSocialBenefitsNewEnergy } from "@/api/system";
import { PvStatistics } from "@/types/system";
const { isChinese } = storeToRefs(useLocaleStore());
const route = useRoute();
const formData = ref<PvStatistics>({
  pvYearDisChargeCapacity: 0,
  pvYearDisChargeCapacityOld: 0,
  pvYearDisChargeCapacityUnit: "",
  pvDayDisChargeCapacity: 0,
  pvDayDisChargeCapacityOld: 0,
  pvDayDisChargeCapacityUnit: "",
  pvCapacity: 0,
  pvYearEffHours: 0,
  pvYearSelfConsumElec: 0,
  pvYearSelfConsumElecOld: 0,
  pvYearSelfConsumElecUnit: "",
  pvYearOnGridElec: 0,
  pvYearOnGridElecOld: 0,
  pvYearOnGridElecUnit: "",
  reduceCarbonEmissions: 0,
  saveStandardCoal: 0,
  treesPlantedNumber: 0,
  greenCertificatesNumber: 0,
});
const maxLength = computed(() => {
  const max = Math.max(
    (round(formData.value.reduceCarbonEmissions, 2) + "").length,
    (round(formData.value.saveStandardCoal, 2) + "").length,
    (round(formData.value.treesPlantedNumber, 2) + "").length,
    (round(formData.value.greenCertificatesNumber, 2) + "").length,
  );
  return max;
});
const loading = ref(false);
async function getData() {
  try {
    loading.value = true;
    const id = route.query.id as string;
    if (!id) {
      return;
    }
    const res = await getSocialBenefitsNewEnergy(id);
    if (res.code === 200) {
      formData.value = res.data;
    }
  } catch (e) {
  } finally {
    loading.value = false;
  }
}
getData();
defineExpose({
  getData
})
</script>
<template>
  <div class="power-curve">
    <PanelTitle :title="$t('renewableEnergySocialBenefits')" />
    <div class="container">

      <div class="cell">
        <!-- <div class="cell-item">
          <svg-icon name="fdl" style="font-size: 48px; margin-right: 16px; flex-shrink: 0"></svg-icon>
          <div class="cell-item-main">
            <div class="name">{{ $t("annualRenewableEnergyGeneration") }}</div>
            <div class="value">
              <div class="value-num">{{ formData.pvYearDisChargeCapacity }}</div>
              <div class="value-unit">kW·h</div>
            </div>
          </div>
        </div> -->
        <div class="cell-item">
          <svg-icon name="yxxss" style="font-size:64px; margin-right: 16px; flex-shrink: 0"></svg-icon>
          <div class="cell-item-main">
            <div class="name">{{ $t("effectiveHours") }}</div>
            <div class="value">
              <div class="value-name">{{ $t("photovoltaic") }}</div>
              <div class="number">
                <div class="value-num">{{ formData.pvYearEffHours }}</div>
                <div class="value-unit">h</div>
              </div>
            </div>
            <!-- <div class="value">
              <div class="value-name">{{ $t("windPower") }}</div>
              <div class="number">
                <div class="value-num">456</div>
                <div class="value-unit">h</div>
              </div>
            </div> -->
          </div>
        </div>
        <!-- <div class="cell-item">
          <svg-icon name="zydl" style="font-size: 48px; margin-right: 16px; flex-shrink: 0"></svg-icon>
          <div class="cell-item-main">
            <div class="name">{{ $t("annualRenewableEnergySelfConsumption") }}</div>
            <div class="value">
              <div class="value-num">{{ formData.pvYearSelfConsumElec }}</div>
              <div class="value-unit">kW·h</div>
            </div>
          </div>
        </div> -->
        <div class="cell-item">
          <svg-icon name="swdl" style="font-size: 64px; margin-right: 16px; flex-shrink: 0"></svg-icon>
          <div class="cell-item-main">
            <div class="name">{{ $t("annualRenewableEnergyGridFeedIn") }}</div>
            <div class="value">
              <div class="value-num">{{ formData.pvYearOnGridElec }}</div>
              <div class="value-unit">kW·h</div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-item">
          <div class="section-item-main">
            <div class="num" :style="{
              fontSize: 22 - maxLength + 'px',
            }">{{ round(+formData.reduceCarbonEmissions, 2) }}</div>
            <div class="unit">/tce</div>
          </div>
          <div class="section-item-text" :class="{
            en: !isChinese,
          }">
            {{ $t("carbonReduction") }}
          </div>
        </div>
        <div class="section-item">
          <div class="section-item-main">
            <div class="num" :style="{
              fontSize: 22 - maxLength + 'px',
            }">{{ round(+formData.saveStandardCoal, 2) }}</div>
            <div class="unit">/tce</div>
          </div>
          <div class="section-item-text" :class="{
            en: !isChinese,
          }">
            {{ $t("standardCoalSaving") }}
          </div>
        </div>
        <div class="section-item">
          <div class="section-item-main">
            <div class="num" :style="{
              fontSize: 22 - maxLength + 'px',
            }">{{ round(+formData.treesPlantedNumber, 2) }}</div>
            <div class="unit">{{ $t("treeUnit") }}</div>
          </div>
          <div class="section-item-text" :class="{
            en: !isChinese,
          }">
            {{ $t("equivalentTreesPlanted") }}
          </div>
        </div>
        <div class="section-item">
          <div class="section-item-main">
            <div class="num" :style="{
              fontSize: 22 - maxLength + 'px',
            }">{{ round(+formData.greenCertificatesNumber, 2) }}</div>
            <div class="unit">{{ $t("certificateUnit") }}</div>
          </div>
          <div class="section-item-text" :class="{
            en: !isChinese,
          }">
            {{ $t("equivalentGreenCertificates") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.power-curve {
  height: 305px;
  width: 100%;

  .container {
    padding: 0px 0 13px 39px;
    width: calc(100%);
    height: calc(100% - 13px);

    .cell {
      display: flex;
      // padding-left: 13px;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 100%;
      gap: 16px 12px;
      height: 143px;
      padding-top: 50px;

      &-item {
        // width: 50%;
        max-height: 64px;
        min-height: 48px;
        display: flex;
        align-items: flex-start;

        &-main {
          padding: 8px 0;
        }

        &:nth-last-of-type(2n-1) {
          flex: 1;
        }

        .name {
          padding-top: 3px;
          /* 二级标题投影 */
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
          font-family: "Alimama FangYuanTi VF";
          font-variation-settings: "BEVL" 1, "wght" 700;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.2px;
          background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 2px;
        }

        .value {
          margin-top: 4px;
          display: flex;
          align-items: baseline;
          background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          font-family: Rubik;
          font-style: normal;
          font-weight: 700;
          line-height: normal;

          .number {
            display: flex;
            align-items: baseline;
          }

          &-name {
            background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            margin-right: 5px;
            /* 二级标题投影 */
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
              0 0 10px rgba(48, 126, 229, 0.6);
            font-family: "HarmonyOS Sans SC";
            font-size: 12px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
            letter-spacing: 1.2px;
          }

          &-num {
            margin-right: 5px;
            font-size: 20px;
            letter-spacing: 2px;
          }

          &-unit {
            font-size: 12px;
            letter-spacing: 1.2px;
          }
        }
      }
    }

    .section {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0 13px;
      min-height: 78px;

      &-item {
        margin-bottom: 8px;

        &-main {
          width: 92px;
          height: 51px;
          background-image: url("@/assets/icons/social.svg");
          display: flex;
          align-items: baseline;
          justify-content: center;

          .num {
            background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            /* 二级标题投影 */
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
              0 0 10px rgba(48, 126, 229, 0.6);
            font-family: Rubik;
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 1.2px;
            margin-right: 2px;
          }

          .unit {
            background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;

            /* 二级标题投影 */
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
              0 0 10px rgba(48, 126, 229, 0.6);
            font-family: Rubik;
            font-size: 12px;
            font-style: normal;
            font-weight: 900;
            line-height: normal;
          }
        }

        &-text {
          margin-top: 12px;
          background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;

          /* 二级标题投影 */
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
          font-family: "Alimama FangYuanTi VF";
          font-variation-settings: "BEVL" 1, "wght" 700;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.2px;
          display: flex;
          align-items: center;
          justify-content: center;

          &.en {
            letter-spacing: -0.8px;
            margin-top: 4px;
          }
        }
      }
    }
  }
}
</style>
