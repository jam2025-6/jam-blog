<template>
  <div
    ref="chartDom"
    class="chart-container"
    :style="{
      width: width,
      height: height,
    }"
  ></div>
</template>

<script setup>
import * as echarts from "echarts";
import { addListener, removeListener } from "resize-detector"; //重新渲染
import { reactive, ref, watch, onMounted, onUnmounted, onBeforeUnmount } from "vue";
const startCharts = reactive({});
const onShow = ref(false);

const chart = {};

const chartDom = ref(null);

const props = defineProps({
  option: {
    type: Object,
    default: () => {},
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "200px",
  },
  clickTarget: {
    //绑定图表事件
    type: String,
    default: "",
  },
});

watch(
  () => props.option,
  (val) => {
    if (!!val && chart.value) {
      chart.value.clear();
      chart.value.setOption(val);
    }
  },
  { deep: true }
);

const resize = () => {
  if (chart.value && chartDom.value) {
    // 检查DOM元素是否有宽度和高度
    if (chartDom.value.clientWidth > 0 && chartDom.value.clientHeight > 0) {
      chart.value.resize();
    }
  }
};

const renderChart = () => {
  if (!!props.option && chartDom.value) {
    // 检查DOM元素是否有宽度和高度
    if (chartDom.value.clientWidth === 0 || chartDom.value.clientHeight === 0) {
      // 如果DOM元素没有尺寸，延迟重试
      setTimeout(() => {
        renderChart();
      }, 100);
      return;
    }
    
    chart.value = echarts.init(chartDom.value, null, {
      devicePixelRatio: 2,
    });

    chart.value.setOption(props.option);
    //startTurn 自动轮播
    if (props?.option?.series[0]?.type == "pie" && props?.option?.startTurn) {
      let currentIndex = -1; // 当前高亮图形在饼图数据中的下标
      const selectPie = () => {
        // 高亮效果切换到下一个图形
        var dataLen = props?.option?.series[0].data.length;
        currentIndex = (currentIndex + 1) % dataLen;
        highlightPie();
      };
      const highlightPie = () => {
        // 取消所有高亮并高亮当前图形
        // 遍历饼图数据，取消所有图形的高亮效果
        for (let idx in props?.option?.series[0].data)
          chart.value &&
            chart.value.dispatchAction({
              type: "downplay",
              seriesIndex: 0,
              dataIndex: idx,
            });
        // 高亮当前图形
        chart.value &&
          chart.value.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
      };
      let changePieInterval = setInterval(selectPie, 4 * 1000); // 设置自动切换高亮图形的定时器

      chart.value.on("mouseover", (params) => {
        // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
        clearInterval(changePieInterval);
        currentIndex = params.dataIndex;
        highlightPie();
      });

      chart.value.on("mouseout", () => {
        // 用户鼠标移出时，重新开始自动切换
        if (changePieInterval) clearInterval(changePieInterval);
        changePieInterval = setInterval(selectPie, 4 * 1000);
      });
    }

    // if (this.clickTarget == "legendselectchanged") {
    //   this.chart.on(_this.clickTarget, function (params) {
    //     _this.$emit("clickEvent", params);
    //   });
    // }


    // 阻止事件冒泡
    chart.value.on('legendselectchanged', function(params) {
        event && event.stopPropagation();
    });
    addListener(chartDom.value, resize);
  }
};

onMounted(() => {
  renderChart();
});

//ref取值dom 这个钩子已经卸载
// onUnmounted(() => {
// });

onBeforeUnmount(() => {
  removeListener(chartDom.value, resize);
  chart.value.dispose();
  chart.value = null;
});
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
