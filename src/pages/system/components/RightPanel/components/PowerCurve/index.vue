<script setup lang="ts">
import { PanelTitle, gdCharts } from "@/components";
import { ref, computed } from "vue";
import * as echarts from "echarts";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { getPowerCurve } from "@/api/system";
const { t } = useI18n();
const options = computed(() => {
  const times: any = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      times.push(`${hh}:${mm}`);
    }
  }
  // 生成指定范围的随机数据
  const generatePowerData = (min: number, max: number) =>
    times.map(() => +(min + Math.random() * (max - min)).toFixed(2));
  // 四组区分明显的数据
  const powerData1 = generatePowerData(30, 60);
  const powerData2 = generatePowerData(80, 130);
  const powerData3 = generatePowerData(180, 220);
  const powerData4 = generatePowerData(250, 320);
  return {
    xAxis: {
      type: "category",
      data: times,
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
      left: "0%",
      right: "2%",
      bottom: "0%",
      top: "0%",
      containLabel: false,
    },
    color: [
      "#FC9F71",
      "#3D88E3",
      "#FFE32A",
      "#28B558",
      // new echarts.graphic.LinearGradient(
      //   1,
      //   0, // x1, y1 (终点坐标)
      //   0,
      //   1, // x2, y2 (起点坐标)
      //   [
      //     { offset: 0, color: "#965F43" },
      //     { offset: 1, color: "#FC9F71" },
      //   ]
      // ),
      // new echarts.graphic.LinearGradient(
      //   1,
      //   0, // x1, y1 (终点坐标)
      //   0,
      //   1, // x2, y2 (起点坐标)
      //   [
      //     { offset: 0, color: "#224B7D" },
      //     { offset: 1, color: "#3D88E3" },
      //   ]
      // ),
      // new echarts.graphic.LinearGradient(
      //   1,
      //   0, // x1, y1 (终点坐标)
      //   0,
      //   1, // x2, y2 (起点坐标)
      //   [
      //     { offset: 0, color: "#B7A10E" },
      //     { offset: 1, color: "#FFE32A" },
      //   ]
      // ),
      // new echarts.graphic.LinearGradient(
      //   1,
      //   0, // x1, y1 (终点坐标)
      //   0,
      //   1, // x2, y2 (起点坐标)
      //   [
      //     { offset: 0, color: "#28B558" },
      //     { offset: 1, color: "#114F26" },
      //   ]
      // ),
    ],
    legend: {
      show: true,
      right: "0%",
      top: "0%",
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
      appendToBody: true,
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
        name: t("load"),
        data: powerData1,
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
      {
        name: t("energyStorage"),
        data: powerData2,
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
        name: t("gridPower"),
        data: powerData3,
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
                  color: "rgba(255, 227, 42, 0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(255, 227, 42, 0.04)",
                },
              ],
              false
            ),
            shadowColor: "#FFE32A",
            shadowBlur: 20,
          },
        },
      },
      {
        name: t("renewableEnergy"),
        data: powerData4,
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
                  color: "rgba(40, 181, 88, 0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(40, 181, 88, 0.04)",
                },
              ],
              false
            ),
            shadowColor: "#28B558",
            shadowBlur: 20,
          },
        },
      },
    ],
  };
});
const route = useRoute();
const formData = ref(false);
const loading = ref(false);
async function getData() {
  try {
    loading.value = true;
    const id = route.query.id as string;
    const res = await getPowerCurve(id);
    formData.value = res.data;
  } catch (e) {
  } finally {
    loading.value = false;
  }
}
getData();
</script>
<template>
  <div class="power-curve">
    <PanelTitle :title="$t('operatingPowerCurve')" />
    <div class="container" v-loading="loading">
      <gdCharts height="100%" :option="options" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.power-curve {
  height: 315px;
  width: 100%;
  .container {
    padding: 12px 21px 16px 43px;
    width: calc(100%);
    height: calc(100% - 42px);
  }
}
</style>
