<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import type { TableColumnCtx } from "element-plus";
import { debounce } from "lodash";
import { useRouter } from "vue-router";
// 定义行数据类型
interface TableRowData {
  date: string;
  power: string;
  stationName: string;
  state: string;
  city: string;
  address: string;
  zip: string;
}
const tooltipX = ref(0);
const tooltipY = ref(0);
const router = useRouter();
const containerRef = ref<HTMLElement | null>(null);
const stationName = ref("");
const tableData = new Array(33).fill({}).map((el, index) => {
  return {
    date: "2016-05-03",
    power: "1",
    stationName: "浙江****储能站3400kwh" + index,
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  };
});

function clickRow(row: TableRowData, column: TableColumnCtx<TableRowData>, event: Event) {
  router.push({
    path: "/system",
  });
}

const handleMouseMove = (event: MouseEvent) => {
  const container = containerRef.value;
  if (!container) return;
  if (!stationName.value) return;
  const rect = container.getBoundingClientRect();
  const scaleX = rect.width / container.offsetWidth;
  const scaleY = rect.height / container.offsetHeight;

  let x = (event.clientX - rect.left) / scaleX + 10;
  let y = (event.clientY - rect.top) / scaleY + 10;

  const tooltipEl = document.querySelector(".tooltip") as HTMLElement;
  if (tooltipEl) {
    const tooltipWidth = tooltipEl.offsetWidth;
    const tooltipHeight = tooltipEl.offsetHeight;

    // 容器右边界检测
    if (x + tooltipWidth > rect.width) {
      x = rect.width - tooltipWidth - 10;
    }
    // 容器下边界检测
    if (y + tooltipHeight > rect.height) {
      y = rect.height - tooltipHeight - 10;
    }

    // 防止左上角越界
    if (x < 0) x = 0;
    if (y < 0) y = 0;
  }

  tooltipX.value = x;
  tooltipY.value = y;
};

function cellMouseEnter(row: TableRowData) {
  stationName.value = row.stationName;
}
function cellMouseLeave() {
  stationName.value = "";
}
</script>
<template>
  <div class="page">
    <div ref="containerRef" class="table" @mousemove="handleMouseMove">
      <el-table
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        :data="tableData"
        stripe
        style="width: 100%; height: 100%"
        @row-click="clickRow"
      >
        <el-table-column align="center" sortable prop="stationName" label="站点名" />
        <el-table-column align="center" sortable prop="power" label="累计节约电量" />
        <el-table-column align="center" sortable prop="state" label="累计新能源消纳占比" />
        <el-table-column align="center" sortable prop="city" label="累计系统收益" />
        <el-table-column align="center" sortable prop="address" label="投资回收期" />
        <el-table-column align="center" sortable prop="zip" label="减碳" />
      </el-table>
      <div
        v-show="!!stationName"
        class="tooltip"
        :style="{
          left: tooltipX + 'px',
          top: tooltipY + 'px',
        }"
      >
        {{ stationName }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  padding: 30px 48px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  .table {
    height: 100%;
    width: 100%;
    background-color: transparent !important;
    background-color: transparent !important;
    border-radius: 36px;
    position: relative;
    overflow: hidden;
    border: none !important;
    box-shadow: 0 0 4px rgba(104, 187, 225, 0.5);
    padding: 12px 36px 22px 36px;
    backdrop-filter: blur(12px);
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid transparent;
      border-radius: 36px;
      background: linear-gradient(to top right, #286be633, #68bbff) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      pointer-events: none;
      z-index: 1;
    }
    :deep(.el-table) {
      background-color: transparent;
      z-index: 2025;
      //
      .el-table__row {
        background-color: rgba($color: #1a417e, $alpha: 0.25) !important;
        // background-color: transparent !important;
      }
      .el-table__row--striped {
        background-color: rgba($color: #0d1b36, $alpha: 0.25) !important;
      }
      .el-table__inner-wrapper {
        &::before {
          display: none;
        }

        tr {
          background-color: rgba($color: #0d1b36, $alpha: 0.25);
          &:hover {
            cursor: pointer;
            box-shadow: 0 0 20px 0 rgba(104, 187, 255, 0.18);
            td {
              &.el-table__cell {
                border-top: 1.2px solid #68bbff;
                border-bottom: 1.2px solid #68bbff;
                // background: rgba(36, 87, 164, 0.4);
                //
                background: rgba(36, 87, 164, 0.25);
                &:first-child {
                  border-left: 1.2px solid #68bbff;
                }
                &:last-child {
                  border-right: 1.2px solid #68bbff;
                }
              }
            }
          }
          th {
            &.el-table__cell {
              background-color: transparent;
              &.is-leaf {
                border-bottom: none;
              }
              .cell {
                color: #fff;
                font-family: "HarmonyOS Sans SC";
                font-size: 18px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                height: 36px;
                line-height: 36px;
              }
            }
          }
          td {
            &.el-table__cell {
              background-color: transparent;
              border-bottom: none;
              border-top: 1.2px solid transparent;
              border-bottom: 1.2px solid transparent;

              .cell {
                color: #e0f0ff;
                font-family: "HarmonyOS Sans SC";
                font-size: 18px;
                height: 30px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
              }
              &:first-child {
                border-left: 1.2px solid transparent;
              }
              &:last-child {
                border-right: 1.2px solid transparent;
              }
              &.is-leaf {
                border-bottom: none;
              }
            }
          }
        }
        .el-table__body-wrapper {
        }
      }
    }
  }
  .tooltip {
    position: fixed;
    padding: 12px;
    border-radius: 4px;
    pointer-events: none;
    z-index: 9999;
    max-width: 200px;
    white-space: nowrap;
    color: #fff;
    /* 内容文字1 */
    font-family: "HarmonyOS Sans SC";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    letter-spacing: 0.6px;
    border: 1px solid #5084b8;
    left: 0;
    top: 0;
    background: #0d2e58;
  }
}
</style>
