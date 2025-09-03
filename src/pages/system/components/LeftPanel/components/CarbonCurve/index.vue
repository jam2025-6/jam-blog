<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { PanelTitle, gdCharts } from "@/components";
import * as echarts from "echarts";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { getCalcCarbonEmissions } from "@/api/system";
import { AmountRecord } from "@/types/system";
const { t } = useI18n();

const options = computed(() => {
  return {
    xAxis: {
      type: "category",
      data: formData.value.map((el) => el.gmtCreate),
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
      name: t("ton"),
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
      show: true,
      right: "0%",
      top: "0%",
      icon: "circle",
      itemWidth: 12,
      itemHeight: 12,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          1,
          0, // x1, y1 (终点坐标)
          0,
          1, // x2, y2 (起点坐标)
          [
            { offset: 0, color: "#28B558" },
            { offset: 1, color: "#114F26" },
          ]
        ),
      },
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
        let dom = `
      <div class="chart-main tooltip">
        <div class="name">${value[0].name}</div>
        <div class="main">
          <div class="item">
            <span class="item-point"></span>
            <span class="item-name">${value[0].seriesName}</span>
            <span class="item-value">${value[0].value}</span>
            <span class="item-unit">t</span>
          </div>
        </div>
      </div>
      `;
        return dom;
      },
    },
    series: [
      {
        name: t("carbonEmission"),
        data: formData.value.map((el) => el.amount),
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
                  color: "rgba(40, 181, 88, 0.50)",
                },
                {
                  offset: 1,
                  color: "rgba(40, 181, 88, 0.00)",
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
const formData = ref<AmountRecord[]>([]);
const loading = ref(false);
async function getData() {
  try {
    loading.value = true;
    const id = route.query.id as string;
    if (!id) {
      return;
    }
    const res = await getCalcCarbonEmissions(id);
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
  <div class="carbon-curve">
    <PanelTitle :title="$t('carbonEmissionCurve')" />
    <div class="container">
      <gdCharts height="100%" :option="options" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.carbon-curve {
  height: 305px;
  width: 100%;

  .container {
    padding: 24px 40px 17px 24px;
    width: calc(100%);
    height: calc(100% - 42px);
  }
}
</style>
