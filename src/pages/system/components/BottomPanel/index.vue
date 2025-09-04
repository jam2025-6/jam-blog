<script setup lang="ts">
import { PanelTitle, gdCharts, Tabs } from "@/components";
import { ref, computed, watch } from "vue";
import * as echarts from "echarts";
import { useI18n } from "vue-i18n";
import { getLoadForecastCurve } from "@/api/system";
import { RealTimeData } from "@/types/system";
import { useRoute } from "vue-router";
import { useLocaleStore } from "@/stores/modules/locale";
import { storeToRefs } from "pinia";
const { isChinese } = storeToRefs(useLocaleStore());
const route = useRoute();
const { t } = useI18n();
const tabList = [
  {
    label: t("loadForecastCurves"),
    value: "load_forecast",
  },
  {
    label: t("generationForecastCurve"),
    value: "power_generation_forecast",
  },
  // {
  //   label: t("spotPriceForecast"),
  //   value: "spotPrice",
  // },
];
const options = ref<any>({
  series: []
})
const tabValue = ref("");
const selectVal = ref('today')
watch(() => [tabValue.value, selectVal.value], () => {
  getData()
})
async function getData() {
  try {
    const id = route.query.id as string;
    if (!id) {
      return;
    }
    let res = await getLoadForecastCurve(id, {
      curveType: tabValue.value,
      dateType: selectVal.value,
    });
    if (res.code === 200) {

      options.value = {
        xAxis: {
          type: "category",
          data: res.data.realTime.map((el) => el.time),
          axisLabel: {
            show: true,
            color: "rgba(182, 212, 254, 0.8)",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(151, 184, 229, 0.8)",
            },
          },
        },
        yAxis: {
          type: "value",
          name: "kW",
          nameTextStyle: {
            color: "rgba(182, 212, 254, 0.8)",
            fontSize: 12,
            align: "right",
          },
          axisLabel: {
            show: true,
            color: "rgba(182, 212, 254, 0.8)",
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(182, 212, 254, 0.20)",
            },
          },
        },
        grid: {
          left: "2%",
          right: "1%",
          bottom: "0%",
          top: "20%",
          containLabel: true,
        },
        color: ["#3D88E3", "#FC9F71"],
        legend: {
          show: true,
          top: "0%",
          left: "7%",
          icon: "circle",
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            color: "rgba(182, 212, 254, 1)",
            fontSize: 12,
            fontFamily: "HarmonyOS Sans SC",
            fontWeight: 400,
            fontStyle: "normal",
            letterSpacing: 0.6,
          },
        },
        tooltip: {
          show: true,
          backgroundColor: "transparent",
          // alwaysShowContent: true,
          trigger: "axis",
          padding: 0,
          borderWidth: 0,
          axisPointer: {
            lineStyle: {
              color: "rgba(167, 221, 244, 0.60)",
            },
          },
          formatter: (value: any) => {
            let items = value
              .map(
                (v: any) => `
      <div class="item">
        ${v.marker}
        <span class="item-name">${v.seriesName}</span>
        <span class="item-value">${v.value}</span>
        <span class="item-unit">kW</span>
      </div>
    `
              )
              .join(""); // 拼接成一个字符串
            let dom = `
      <div class="chart-main tooltip">
        <div class="name">${value[0].name}</div>
        <div class="main">
            ${items}
        </div>
      </div>
      `;
            return dom;
          },
        },
        series: [
          {
            name: tabValue.value === 'load_forecast' ? t("loadActual") : tabValue.value === 'power_generation_forecast' ? t("generationActual") : t("spotActual"),
            data: res.data.realTime.map((el) => el.value),
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 0,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(61, 136, 227, 0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(61, 136, 227, 0.04)",
                    },
                  ],
                  false
                ),
                shadowColor: "#3D88E3",
                shadowBlur: 20,
              },
            },
          },
          {
            name: tabValue.value === 'load_forecast' ? t("loadForecast") : tabValue.value === 'power_generation_forecast' ? t("generationForecast") : t("spotForecast"),
            data: [],
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 0,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(252, 159, 113, 0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(252, 159, 113, 0.04)",
                    },
                  ],
                  false
                ),
                shadowColor: "#FC9F71",
                shadowBlur: 20,
              },
            },
          },
        ],
      }
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
  <div class="bottom-panel">
    <PanelTitle :title="$t('loadForecastCurve')" size="large" />
    <div class="container">
      <el-select :style="{
        width: isChinese ? '80px' : '140px'
      }" style="position: absolute;right: 245px;top: 4px;z-index: 2024;" size="small" v-model="selectVal">
        <el-option :label="$t('lastSevenDays')" value="last_seven_days"></el-option>
        <el-option :label="$t('currentDay')" value="today"></el-option>
      </el-select>
      <Tabs :list="tabList" v-model="tabValue" />
      <gdCharts v-if="tabValue" :option="options" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom-panel {
  width: 922px;
  height: 315px;
  position: absolute;
  left: 499px;
  bottom: 24px;
  right: 499px;
  background: linear-gradient(180deg, rgba(5, 17, 42, 0.02) 0%, rgba(15, 75, 156, 0.03) 100%);
  backdrop-filter: blur(12px);
  padding-top: 34px;

  .container {
    padding-top: 5px;
    height: calc(100% - 42px);
    width: 100%;
    position: relative;

    .chart-container {
      height: 100% !important;
    }
  }
}
</style>
