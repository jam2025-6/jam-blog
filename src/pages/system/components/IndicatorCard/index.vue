<script setup lang="ts">
import { ref } from "vue";
import { useLocaleStore } from "@/stores/modules/locale";
import { storeToRefs } from "pinia";
import { getCoreHeader } from '@/api/system'
import { useRoute } from "vue-router";
import { EnergyAndEarningsData } from '@/types/system'
import { QuestionFilled } from '@element-plus/icons-vue'
import { convertEnergy } from '@/utils/tools'
import { round } from "lodash";
const route = useRoute();
const { isChinese } = storeToRefs(useLocaleStore());
const formData = ref<EnergyAndEarningsData>({
  newEnergyTotalCapacity: 0,
  newEnergyTotalCapacityOld: 0,
  newEnergyTotalCapacityUnit: "MWh",
  newEnergyTotalCapacityPercent: "0%",
  pvcDisChargeTotalEarnings: 0,
  pvcDisChargeTotalEarningsUnit: "元",
  totalEarnings: 0,
  totalEarningsUnit: "元",
  carbonReduction: 0,
  carbonReductionUnit: "t",
  carbonEmissionUnitEnergyConsum: 0,
  carbonEmissionUnitEnergyConsumUnit: "吨/吨标准煤"
})
async function getData() {
  try {
    const id = route.query.id as string;
    if (!id) {
      return;
    }
    let res = await getCoreHeader(id);
    if (res.code === 200) {
      formData.value = res.data;
    }
  } catch (e) {
  } finally {
  }
}
getData();
defineExpose({
  getData
})
</script>
<template>
  <div class="indicator-card" :class="{
    en: !isChinese,
  }">
    <div class="item">
      <div class="item-title">{{ $t("cumulativeEnergySaved") }}</div>
      <div class="item-indicator">
        <div class="item-indicator-num">{{ convertEnergy(formData.newEnergyTotalCapacity).value }}</div>
        <div class="item-indicator-unit">{{ convertEnergy(formData.newEnergyTotalCapacity).unit }}</div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">{{ $t("renewableEnergyUtilizationRate") }}</div>
      <div class="item-indicator">
        <div class="item-indicator-num">{{ round(Number(formData.newEnergyTotalCapacityPercent) * 100, 2) }}</div>
        <div class="item-indicator-unit">%</div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">{{ $t("cumulativeSystemRevenue") }}</div>
      <div class="item-indicator">
        <div class="item-indicator-num">{{ formData.totalEarnings }}</div>
        <div class="item-indicator-unit">{{ formData.totalEarningsUnit }}</div>
      </div>
    </div>
    <div class="item">
      <div class="item-title" style="display: flex;align-items: center;">
        <div style="margin-right: 4px;">{{ $t("investmentPaybackPeriod") }}</div>
        <el-tooltip popper-class="custon-tooltip">
          <template #content>
            <div class="tooltip-text">
              <div>{{ $t('targetRequirements') }}</div>
              <div style="text-indent: 2em;">{{ $t('energyTargetRequirement1') }}；</div>
              <div style="text-indent: 2em;">{{ $t('energyTargetRequirement2') }}。</div>
            </div>
          </template>
          <el-icon style="cursor: pointer;  flex-shrink: 0;" size="14" color="#CBDAF5">
            <QuestionFilled />
          </el-icon>
        </el-tooltip>

      </div>
      <div class="item-indicator">
        <div class="item-indicator-num">{{ formData.carbonEmissionUnitEnergyConsum || 0 }}</div>
        <div class="item-indicator-unit">{{ formData.carbonEmissionUnitEnergyConsumUnit || '吨/吨标准煤' }}</div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">{{ $t("carbonReductions") }}</div>
      <div class="item-indicator">
        <div class="item-indicator-num orange">{{ formData.carbonReduction }}</div>
        <div class="item-indicator-unit orange">{{ formData.carbonReductionUnit }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.indicator-card {
  width: 890px;
  height: 76px;
  border-radius: 20px;
  border-bottom: 2px solid #115199;
  background: linear-gradient(180deg, rgba(15, 75, 156, 0.02) 0%, rgba(5, 17, 42, 0.03) 100%);
  backdrop-filter: blur(12px);
  position: absolute;
  top: 109px;
  left: 515px;
  right: 515px;
  display: flex;
  padding-top: 16px;
  justify-content: center;
  gap: 0 52px;

  &.en {
    gap: 0 24px;

    .item {
      &-title {
        font-size: 14px;
        letter-spacing: 0px;
      }
    }
  }

  .item {
    &-title {
      background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      /* 二级标题投影 */

      /* 二级标题投影 */
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
      font-family: "Alimama FangYuanTi VF";
      font-variation-settings: "BEVL" 1, "wght" 700;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 1.6px;
      margin-bottom: 4px;
    }

    &-indicator {
      display: flex;
      align-items: baseline;

      &-num {
        background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Rubik;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 2px;
        margin-right: 5px;

        &.orange {
          background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
          background-clip: text;
          -webkit-background-clip: text;
        }
      }

      &-unit {
        background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
        background-clip: text;
        -webkit-background-clip: text;
        font-family: Rubik;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.6px;
        -webkit-text-fill-color: transparent;

        &.orange {
          background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
          background-clip: text;
          -webkit-background-clip: text;
        }
      }
    }
  }
}

.tooltip-text {
  >div {
    padding: 2px 0;
    color: #FFF;
    leading-trim: both;
    text-edge: cap;

    /* 内容文字1 */
    font-family: "HarmonyOS Sans SC";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: 0.6px;
  }
}
</style>
