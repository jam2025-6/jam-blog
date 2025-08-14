<script setup lang="ts">
import { PanelTitle, gdCharts, Tabs } from "@/components";
import { ref, computed, watch } from "vue";
import * as echarts from "echarts";

const tabList = [
  {
    label: "负荷预测曲线",
    value: "负荷预测曲线",
  },
  {
    label: "发电预测曲线",
    value: "发电预测曲线",
  },
  {
    label: "现货价格预测",
    value: "现货价格预测",
  },
];
const tabValue = ref("");
const options = computed(() => {
  console.log("%c [  ]-22", "font-size:13px; background:pink; color:#bf2c9f;", tabValue.value);
  if (!tabValue.value) {
    return;
  }
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
  const data: Record<
    string,
    {
      name: string;
      data: number[];
    }[]
  > = {
    负荷预测曲线: [
      {
        name: "负荷实况",
        data: generatePowerData(50, 100),
      },
      {
        name: "负荷预测",
        data: generatePowerData(40, 130),
      },
    ],
    发电预测曲线: [
      {
        name: "发电实况",
        data: generatePowerData(60, 100),
      },
      {
        name: "发电预测",
        data: generatePowerData(50, 90),
      },
    ],
    现货价格预测: [
      {
        name: "现货实况",
        data: generatePowerData(20, 29),
      },
      {
        name: "现货预测",
        data: generatePowerData(30, 50),
      },
    ],
  };
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
        name: data[tabValue.value][0].name,
        data: data[tabValue.value][0].data,
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
        name: data[tabValue.value][1].name,
        data: data[tabValue.value][1].data,
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
  };
});
</script>
<template>
  <div class="bottom-panel">
    <PanelTitle title="负荷预测曲线" size="large" />
    <div class="container">
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
  }
}
</style>
