<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import type { TableColumnCtx } from "element-plus";
import { debounce } from "lodash";
import { useRouter } from "vue-router";
import bus from "@/utils/bus";
import { getMicrogridList } from "@/api/home";
import { Microgrid, Station } from "@/types/home";
const tooltipX = ref(0);
const tooltipY = ref(0);
const loading = ref(false);
const router = useRouter();
const containerRef = ref<HTMLElement | null>(null);
const stationName = ref("");
const hoverId = ref<string | undefined | null>(null);
const tableData = ref<Microgrid[]>([]);
const params = ref({
  pageNum: 1,
  pageSize: 20,
  microgridName: "",
  stationName: "",
});
const total = ref(0);
const expandedKeys = ref<string[]>([]);

function clickRow(row: Microgrid, column: TableColumnCtx<Microgrid>, event: Event) {
  const index = tableData.value.findIndex((el) => el.id === row.id);
  if (index === -1) return;
  router.push({
    path: "/system",
    query: {
      id: row.id,
    },
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

function cellMouseEnter(row: Microgrid, column: TableColumnCtx<Microgrid>, cell: HTMLTableCellElement, event: Event) {
  const index = tableData.value.findIndex((el) => el.id === row.id);
  // 如果是父节点
  if (index > -1) {
    stationName.value = row.microgridName;
    hoverId.value = row.id;
  } else {
    // 子节点
    const obj = tableData.value.find((item) => item.children && item.children.find((el) => el.id === row.id));
    if (obj) {
      stationName.value = obj.microgridName;
      hoverId.value = obj.id;
    }
  }
}
function cellMouseLeave() {
  stationName.value = "";
  hoverId.value = null;
}

// 自定义行样式
const tableRowClassName = ({ row, rowIndex }: { row: Microgrid; rowIndex: number }) => {
  if (!tableData.value || tableData.value.length === 0) {
    return "";
  }

  const index = tableData.value.findIndex((el) => el.id === row.id);

  // 是子节点
  if (index === -1) {
    const parentIndex = tableData.value.findIndex(
      (item) => item.children && item.children.some((el) => el.id === row.id)
    );
    const parentItem = tableData.value.find((item) => item.children && item.children.some((el) => el.id === row.id));

    if (parentIndex === -1 || !parentItem) return "";

    const isParentHovered = parentItem.id === hoverId.value;
    const isParentExpanded = expandedKeys.value?.includes(parentItem.id);
    const isLastChild = parentItem.children?.[parentItem.children.length - 1]?.id === row.id;

    if (parentIndex % 2 !== 0) {
      if (isParentHovered) {
        return isLastChild ? "table-row-stripe hover-item last-child" : "table-row-stripe hover-item";
      }
      return "table-row-stripe";
    } else {
      if (isParentHovered) {
        return isLastChild ? "hover-item last-child" : "hover-item";
      }
      return "";
    }
  } else {
    // 是父节点
    const isHovered = row.id === hoverId.value;
    const hasChildren = tableData.value[index]?.children && tableData.value[index].children.length > 0;
    const isExpanded = expandedKeys.value?.includes(row.id);

    if (index % 2 !== 0) {
      if (isHovered) {
        if (hasChildren) {
          return "table-row-stripe hover-item first-child" + (!isExpanded ? " only-child" : "");
        } else {
          return "table-row-stripe hover-item only-child";
        }
      } else {
        return "table-row-stripe";
      }
    } else {
      if (isHovered) {
        if (hasChildren) {
          return "hover-item first-child" + (!isExpanded ? " only-child" : "");
        } else {
          return "hover-item only-child";
        }
      } else {
        return "";
      }
    }
  }
};
// 获取列表
async function getList() {
  try {
    loading.value = true;
    let res = await getMicrogridList(params.value);
    if (res.code === 200) {
      tableData.value = res.data.list.map((item: Microgrid) => {
        if (item.children && item.children.length) {
          item.children = item.children.map((child: Station) => {
            child.pvInstalledPowerSum = child.pvInstalledPower;
            child.windCapacitySum = child.windCapacity;
            child.installedCapacitySum = child.installedCapacity;
            child.pileInstalledPowerSum = child.pileInstalledPower;
            child.directCurrentPileInstalledPowerSum = child.directCurrentPileInstalledPower;
            child.id = item.id + child.stationId;
            return child;
          });
        }
        return item;
      });
      total.value = res.data.totalCount;
    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
}
const currentChangeHandle = (val: number) => {
  params.value.pageNum = val;
  getList();
};

const pageSizeChangeHandle = (val: number) => {
  params.value.pageSize = val;
  getList();
};
const handleExpandChange = (row: Microgrid, expanded: boolean) => {
  if (expanded) {
    expandedKeys.value.push(row.id);
  } else {
    expandedKeys.value = expandedKeys.value.filter((id) => id !== row.id);
  }
};

onMounted(() => {
  getList();
  bus.on("globalSearch", (user) => {
    params.value.microgridName = user.microgridName;
    params.value.stationName = user.stationName;
    params.value.pageNum = 1;
    params.value.pageSize = 20;
    getList();
  });
});
onUnmounted(() => {
  bus.off("globalSearch");
});
</script>
<template>
  <div class="page">
    <div ref="containerRef" class="table" @mousemove="handleMouseMove">
      <el-table @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave" :data="tableData"
        :row-class-name="tableRowClassName" style="width: 100%; height: 100%" @row-click="clickRow" row-key="id"
        @expand-change="handleExpandChange">
        <el-table-column min-width="200" sortable prop="stationName" :label="$t('name')">
          <template #default="{ row }">
            {{ row.microgridName || row.stationName }}
          </template>
        </el-table-column>
        <el-table-column prop="pvInstalledPowerSum" align="center" sortable :label="$t('pvCapacity')" />
        <el-table-column prop="windCapacitySum" align="center" sortable :label="$t('windPowerCapacity')" />
        <el-table-column prop="installedCapacitySum" align="center" sortable :label="$t('energyStorageCapacity')" />
        <el-table-column prop="pileInstalledPowerSum" align="center" sortable :label="$t('acChargingPileCapacity')" />
        <el-table-column prop="directCurrentPileInstalledPowerSum" align="center" sortable
          :label="$t('dcChargingPileCapacity')" />
      </el-table>
      <div v-show="!!stationName" class="tooltip" :style="{
        left: tooltipX + 'px',
        top: tooltipY + 'px',
      }">
        {{ stationName }}
      </div>
    </div>
    <div class="table-pagination">
      <el-pagination v-model:current-page="params.pageNum" v-model:page-size="params.pageSize"
        :page-sizes="[10, 20, 30, 50, 100]" :disabled="false" :background="false"
        layout="total, prev, pager, next, sizes, jumper" :total="total" @size-change="pageSizeChangeHandle"
        @current-change="currentChangeHandle" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  padding: 30px 48px 10px 48px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  .table {
    height: calc(100% - 52px);
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

      .el-table__row {
        background-color: rgba($color: #1a417e, $alpha: 0.25) !important;

        .is-center {
          .cell {
            justify-content: center;
          }
        }

        .cell {
          display: flex;
          align-items: center;
          padding: 0;

          .el-table__indent {
            // padding-left: 0 !important;
          }

          .el-table__placeholder {
            width: 76px;
            height: 32px;
          }

          .el-table__expand-icon {
            width: 76px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 0;

            .el-icon {
              font-size: 20px;
              color: #fff;
            }
          }
        }
      }

      .table-row-stripe {
        background-color: rgba($color: #0d1b36, $alpha: 0.25) !important;
      }

      .el-table__inner-wrapper {
        &::before {
          display: none;
        }

        .el-table__header {
          tr {
            background-color: rgba($color: #0d1b36, $alpha: 0.25);

            th {
              &.el-table__cell {
                background-color: transparent;

                &.is-leaf {
                  border-bottom: none;
                }

                .cell {
                  text-align: center;
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
          }
        }

        .el-table__row {
          // .el-table__expanded-cell {
          // }
          background-color: rgba($color: #0d1b36, $alpha: 0.25);
          // &:not(.el-table__row--level-1) {
          //   &:hover {
          //     cursor: pointer;
          //     box-shadow: 0 0 20px 0 rgba(104, 187, 255, 0.18);
          //     td {
          //       &.el-table__cell {
          //         border-top: 1.2px solid #68bbff;
          //         border-bottom: 1.2px solid #68bbff;
          //         // background: rgba(36, 87, 164, 0.4);
          //         //
          //         background: rgba(36, 87, 164, 0.25);
          //         &:first-child {
          //           border-left: 1.2px solid #68bbff;
          //         }
          //         &:last-child {
          //           border-right: 1.2px solid #68bbff;
          //         }
          //       }
          //     }
          //   }
          // }

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

        .el-table__body-wrapper {}

        .hover-item {
          cursor: pointer;

          td {
            &.el-table__cell {
              background: rgba(36, 87, 164, 0.25);

              &:first-child {
                border-left: 1.2px solid #68bbff;
              }

              &:last-child {
                border-right: 1.2px solid #68bbff;
              }
            }
          }

          &.only-child {
            td {
              &.el-table__cell {
                border-top: 1.2px solid #68bbff !important;
                border-bottom: 1.2px solid #68bbff !important;
              }
            }
          }

          &.first-child {
            td {
              &.el-table__cell {
                border-top: 1.2px solid #68bbff;
                // border-bottom: 1.2px solid #68bbff;
              }
            }
          }

          &.last-child {
            td {
              &.el-table__cell {
                border-bottom: 1.2px solid #68bbff;
              }
            }
          }
        }
      }
    }
  }

  .table-pagination {
    height: 52px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    :deep(.el-pagination) {
      text-align: center;
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
    line-height: 16px;
    /* 133.333% */
    letter-spacing: 0.6px;
    border: 1px solid #5084b8;
    left: 0;
    top: 0;
    background: #0d2e58;
  }
}
</style>
