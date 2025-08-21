<script setup lang="ts">
import { PanelTitle, gdCharts } from "@/components";
import { ref, computed } from "vue";
import * as echarts from "echarts";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const options = computed(() => {
  return {
    xAxis: {
      type: "category",
      data: ["07-17", "07-18", "07-19", "07-20", "07-21", "07-22", "07-23"],
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
      name: t("yuan"),
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
    color: ["#28B558"],
    legend: {
      show: false,
    },
    tooltip: {
      show: true,
      backgroundColor: "transparent",
      // alwaysShowContent: true,
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        lineStyle: {
          color: "rgba(167, 221, 244, 0.60)",
        },
      },
      padding: 0,
      borderWidth: 0,

      formatter: (value: any) => {
        let dom = `
      <div class="chart-main tooltip">
        <div class="name">${value[0].name}</div>
        <div class="main">
          <div class="item">
            <span class="item-point blue"></span>
            <span class="item-name">${value[0].seriesName}</span>
            <span class="item-value">${value[0].value}</span>
            <span class="item-unit">${t("yuan")}</span>
          </div>
        </div>
      </div>
      `;
        return dom;
      },
    },
    series: [
      {
        name: t("revenue"),
        data: [20, 32, 91, 34, 90, 30, 20],
        type: "bar",
        barWidth: 12,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(71, 234, 234, 1)", // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "rgba(64, 206, 215, 1)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(39, 139, 153, 0.5)", // 100% 处的颜色
                },
              ],
              false
            ),
            barBorderRadius: [30, 30, 0, 0],
            // shadowColor: "rgba(0,160,221,1)",
            shadowBlur: 4,
          },
        },
      },
    ],
  };
});
</script>
<template>
  <div class="income-comparison">
    <PanelTitle :title="$t('recent7DaysRevenueComparison')" />
    <div class="container">
      <gdCharts height="100%" :option="options" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.income-comparison {
  height: 348px;
  width: 100%;
  .container {
    padding: 20px 14px 19px 32px;
    width: calc(100%);
    height: calc(100% - 42px);
  }
}
</style>
