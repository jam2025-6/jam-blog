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
const router = useRouter();
const tableRef = ref<HTMLElement | null>(null);
const tableData = new Array(33).fill({
  date: "2016-05-03",
  power: "1",
  stationName: "浙江****储能站3400kwh",
  state: "California",
  city: "Los Angeles",
  address: "No. 189, Grove St, Los Angeles",
  zip: "CA 90036",
});
const tooltipVisible = ref(true);
const tooltipContent = ref("浙江****储能站3400kwh");
const tooltipPosition = ref({
  left: "0px",
  top: "0px",
  transform: "",
});
// 使用 Lodash 的防抖函数
const debouncedMouseEnter = debounce((row: any, event: MouseEvent) => {
  if (!tableRef.value) return;

  const tableRect = tableRef.value.getBoundingClientRect();
  const tableWidth = tableRect.width;
  const mouseX = event.clientX - tableRect.left;
  const mouseY = event.clientY - tableRect.top;

  tooltipContent.value = row.stationName;

  const tooltipWidth = 300;
  const showOnLeft = mouseX > tableWidth - tooltipWidth - 20;

  tooltipPosition.value = {
    left: `${mouseX}px`,
    top: `${mouseY}px`,
    transform: showOnLeft ? "translateX(-100%) translateY(-50%)" : "translateY(-50%)",
  };

  tooltipVisible.value = true;
}, 100);
function handleCellMouseEnter(
  row: TableRowData,
  column: TableColumnCtx<TableRowData>,
  cell: HTMLElement,
  event: MouseEvent
) {
  debouncedMouseEnter(row, event);
}
function handleCellMouseLeave() {
  debouncedMouseEnter.cancel(); // 取消延迟的执行
  tooltipVisible.value = false;
}
function clickRow(row: TableRowData, column: TableColumnCtx<TableRowData>, event: Event) {
  router.push({
    path: "/system",
  });
}
</script>
<template>
  <div class="page">
    <div class="table" ref="tableRef">
      <el-table
        :data="tableData"
        style="width: 100%; height: 100%"
        @cell-mouse-enter="handleCellMouseEnter"
        @cell-mouse-leave="handleCellMouseLeave"
        @row-click="clickRow"
      >
        <el-table-column align="center" sortable prop="stationName" label="站点名" />
        <el-table-column align="center" sortable prop="power" label="累计节约电量" />
        <el-table-column align="center" sortable prop="state" label="累计新能源消纳占比" />
        <el-table-column align="center" sortable prop="city" label="累计系统收益" />
        <el-table-column align="center" sortable prop="address" label="投资回收期" />
        <el-table-column align="center" sortable prop="zip" label="减碳" />
      </el-table>
      <div class="tooltip" :style="tooltipPosition" v-show="tooltipVisible">
        {{ tooltipContent }}
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
      .el-table__inner-wrapper {
        &::before {
          display: none;
        }

        tr {
          background-color: transparent;
          &:hover {
            cursor: pointer;
            box-shadow: 0 0 20px 0 rgba(104, 187, 255, 0.18);
            td {
              &.el-table__cell {
                border-top: 1.2px solid #68bbff;
                border-bottom: 1.2px solid #68bbff;
                // background: rgba(36, 87, 164, 0.4);
                //
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
    position: absolute;
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
    background: #0d2e58;
  }
}
</style>
