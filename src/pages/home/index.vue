<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import bus from "@/utils/bus";
import { getMicrogridList } from "@/api/home";
import { Microgrid, Station } from "@/types/home";
// 定义 tooltip 的 X 坐标，用于控制 tooltip 的水平位置
const tooltipX = ref(0);
// 定义 tooltip 的 Y 坐标，用于控制 tooltip 的垂直位置
const tooltipY = ref(0);
// 定义加载状态，用于显示或隐藏加载提示
const loading = ref(false);
// 获取路由实例，用于页面导航
const router = useRouter();
// 定义容器的引用，用于获取容器元素
const containerRef = ref<HTMLElement | null>(null);
// 定义当前悬停的站点名称，用于显示 tooltip 内容
const stationName = ref("");
// 定义当前悬停的 ID，用于标识当前悬停的元素
const hoverId = ref<string | undefined | null>(null);
// 定义表格数据，存储微电网列表信息
const tableData = ref<Microgrid[]>([]);
// 定义请求参数，用于获取微电网列表
const params = ref({
  pageNum: 1, // 当前页码
  pageSize: 20, // 每页显示的数量
  microgridName: "", // 微电网名称
  stationName: "", // 站点名称
});
// 定义总数据量，用于分页显示
const total = ref(0);
// 定义展开的行 ID 列表，用于控制表格行的展开状态
const expandedKeys = ref<string[]>([]);
const microgridNameKeyword = ref('')
const stationNameKeyWord = ref('')
/**
 * 点击表格行时触发的事件处理函数
 * @param row - 当前点击的微电网数据行
 */
function clickRow(row: Microgrid) {
  // 查找当前行在表格数据中的索引
  const index = tableData.value.findIndex((el) => el.id === row.id);
  if (index === -1) {
    // 如果未找到，说明点击的是子节点，查找其父节点
    const obj = tableData.value.find(item => item.children && item.children.findIndex(el => el.id === row.id) > -1)
    if (obj) {
      // 跳转到系统页面，并传递父节点 ID
      router.push({
        path: "/system",
        query: {
          id: obj.id,
        },
      });
    }
  } else {
    // 如果找到，说明点击的是父节点，跳转到系统页面并传递当前行 ID
    router.push({
      path: "/system",
      query: {
        id: row.id,
        title: row.microgridAbbreviation
      },
    });
  }
}

/**
 * 鼠标移动时触发的事件处理函数，用于更新 tooltip 的位置
 * @param event - 鼠标事件对象
 */
const handleMouseMove = (event: MouseEvent) => {
  // 获取容器元素
  const container = containerRef.value;
  if (!container) return;
  if (!stationName.value) return;
  // 获取容器的边界矩形
  const rect = container.getBoundingClientRect();
  // 计算容器的缩放比例
  const scaleX = rect.width / container.offsetWidth;
  const scaleY = rect.height / container.offsetHeight;

  // 计算 tooltip 的初始位置
  let x = (event.clientX - rect.left) / scaleX + 10;
  let y = (event.clientY - rect.top) / scaleY + 10;

  // 获取 tooltip 元素
  const tooltipEl = document.querySelector(".tooltip") as HTMLElement;
  if (tooltipEl) {
    // 获取 tooltip 的宽度和高度
    const tooltipWidth = tooltipEl.offsetWidth;
    const tooltipHeight = tooltipEl.offsetHeight;

    // 容器右边界检测，防止 tooltip 超出容器右边界
    if (x + tooltipWidth > rect.width) {
      x = rect.width - tooltipWidth - 10;
    }
    // 容器下边界检测，防止 tooltip 超出容器下边界
    if (y + tooltipHeight > rect.height) {
      y = rect.height - tooltipHeight - 10;
    }

    // 防止左上角越界，确保 tooltip 不会超出容器左上角
    if (x < 0) x = 0;
    if (y < 0) y = 0;
  }

  // 更新 tooltip 的位置
  tooltipX.value = x;
  tooltipY.value = y;
};

/**
 * 鼠标进入表格单元格时触发的事件处理函数
 * @param row - 当前悬停的微电网数据行
 */
function cellMouseEnter(row: Microgrid) {
  // 查找当前行在表格数据中的索引
  const index = tableData.value.findIndex((el) => el.id === row.id);
  // 如果是父节点
  if (index > -1) {
    // 设置当前悬停的站点名称和 ID
    stationName.value = row.microgridName;
    hoverId.value = row.id;
  } else {
    // 子节点
    // 查找子节点对应的父节点
    const obj = tableData.value.find((item) => item.children && item.children.find((el) => el.id === row.id));
    if (obj) {
      // 设置当前悬停的站点名称和父节点 ID
      stationName.value = obj.microgridName;
      hoverId.value = obj.id;
    }
  }
}

/**
 * 鼠标离开表格单元格时触发的事件处理函数
 * 用于清空当前悬停的站点名称和 ID
 */
function cellMouseLeave() {
  stationName.value = "";
  hoverId.value = null;
}

/**
 * 自定义表格行的类名，用于控制行的样式
 * @param param0 - 包含当前行数据和行索引的对象
 * @returns 表格行的类名
 */
const tableRowClassName = ({ row }: { row: Microgrid; rowIndex: number }) => {
  if (!tableData.value || tableData.value.length === 0) {
    return "";
  }

  // 查找当前行在表格数据中的索引
  const index = tableData.value.findIndex((el) => el.id === row.id);

  // 是子节点
  if (index === -1) {
    // 查找子节点对应的父节点的索引
    const parentIndex = tableData.value.findIndex(
      (item) => item.children && item.children.some((el) => el.id === row.id)
    );
    // 查找子节点对应的父节点
    const parentItem = tableData.value.find((item) => item.children && item.children.some((el) => el.id === row.id));

    if (parentIndex === -1 || !parentItem) return "";

    // 判断父节点是否处于悬停状态
    const isParentHovered = parentItem.id === hoverId.value;
    // const isParentExpanded = expandedKeys.value?.includes(parentItem.id);
    // 判断是否为最后一个子节点
    const isLastChild = parentItem.children?.[parentItem.children.length - 1]?.id === row.id;

    if (parentIndex % 2 !== 0) {
      if (isParentHovered) {
        // 如果是最后一个子节点，添加 last-child 类名
        return isLastChild ? "table-row-stripe hover-item last-child" : "table-row-stripe hover-item";
      }
      return "table-row-stripe";
    } else {
      if (isParentHovered) {
        // 如果是最后一个子节点，添加 last-child 类名
        return isLastChild ? "hover-item last-child" : "hover-item";
      }
      return "";
    }
  } else {
    // 是父节点
    // 判断当前行是否处于悬停状态
    const isHovered = row.id === hoverId.value;
    // 判断当前行是否有子节点
    const hasChildren = tableData.value[index]?.children && tableData.value[index].children.length > 0;
    // 判断当前行是否处于展开状态
    const isExpanded = expandedKeys.value?.includes(row.id);

    if (index % 2 !== 0) {
      if (isHovered) {
        if (hasChildren) {
          // 如果有子节点，添加 first-child 类名，根据是否展开添加 only-child 类名
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
          // 如果有子节点，添加 first-child 类名，根据是否展开添加 only-child 类名
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

/**
 * 获取微电网列表数据
 */
async function getList() {
  try {
    stationNameKeyWord.value = params.value.stationName
    microgridNameKeyword.value = params.value.microgridName
    // 开始加载，显示加载状态
    loading.value = true;
    // 调用接口获取微电网列表数据
    let res = await getMicrogridList(params.value);
    if (res.code === 200) {
      // 处理返回的数据
      tableData.value = res.data.list.map((item: Microgrid) => {
        if (item.children && item.children.length) {
          // 处理子节点数据
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
      // if (params.value.stationName) {
      //   // 如果有站点名称参数，展开所有行
      //   expandedKeys.value = tableData.value.map((item) => item.id);
      // } else {
      //   // expandedKeys.value = []
      // }
      // 更新总数据量
      total.value = res.data.totalCount;
    }
  } catch (err) {
    // 捕获异常并打印错误信息
    console.log(err);
  } finally {
    // 加载结束，隐藏加载状态
    loading.value = false;
  }
}

/**
 * 当前页码改变时触发的事件处理函数
 * @param val - 新的页码
 */
const currentChangeHandle = (val: number) => {
  // 更新当前页码
  params.value.pageNum = val;
  // 重新获取列表数据
  getList();
};

/**
 * 每页显示数量改变时触发的事件处理函数
 * @param val - 新的每页显示数量
 */
const pageSizeChangeHandle = (val: number) => {
  // 更新每页显示数量
  params.value.pageSize = val;
  // 重置当前页码为第一页
  params.value.pageNum = 1
  // 重新获取列表数据
  getList();
};

/**
 * 表格行展开状态改变时触发的事件处理函数
 * @param row - 当前行的微电网数据
 * @param expanded - 是否展开
 */
const handleExpandChange = (row: Microgrid, expanded: boolean) => {
  if (expanded) {
    // 如果展开，将行 ID 添加到展开列表中
    expandedKeys.value.push(row.id);
  } else {
    // 如果折叠，从展开列表中移除行 ID
    expandedKeys.value = expandedKeys.value.filter((id) => id !== row.id);
  }
};

// 高亮函数
function highlight(text: string, keyword: string) {
  if (!keyword) return text
  const reg = new RegExp(`(${keyword})`, 'gi') // 忽略大小写
  return text.replace(reg, `<span class="highlight">$1</span>`)
}

/**
 * 组件挂载时触发的生命周期钩子
 * 用于初始化数据和监听全局搜索事件
 */
onMounted(() => {
  // 初始化获取微电网列表数据
  getList();
  // 监听全局搜索事件
  bus.on("globalSearch", async (user) => {

    // 更新搜索参数
    params.value.microgridName = user.microgridName;
    params.value.stationName = user.stationName;
    params.value.pageNum = 1;
    params.value.pageSize = 20;
    // 重新获取列表数据
    await getList();
  });
});

/**
 * 组件卸载时触发的生命周期钩子
 * 用于移除全局搜索事件监听
 */
onUnmounted(() => {
  // 移除全局搜索事件监听
  bus.off("globalSearch");
});
</script>
<template>
  <div class="page">
    <div ref="containerRef" class="table" @mousemove="handleMouseMove">
      <el-table v-loading="loading" @cell-mouse-enter="cellMouseEnter" @cell-mouse-leave="cellMouseLeave"
        :data="tableData" :row-class-name="tableRowClassName" style="width: 100%; height: 100%" @row-click="clickRow"
        row-key="id" @expand-change="handleExpandChange">
        <el-table-column min-width="200" sortable prop="stationName" :label="$t('name')">
          <template #default="{ row }">
            <div class="name-text" v-if="row.microgridName" v-html="highlight(row.microgridName, microgridNameKeyword)">
            </div>
            <div v-else-if="row.stationName" class="name-text" v-html="highlight(row.stationName, stationNameKeyWord)">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pvInstalledPowerSum" align="center" sortable :label="$t('pvCapacity') + '(kW)'" />
        <el-table-column prop="windCapacitySum" align="center" sortable :label="$t('windPowerCapacity') + '(kW)'" />
        <el-table-column prop="installedCapacitySum" align="center" sortable
          :label="$t('energyStorageCapacity') + '(kWh)'" />
        <el-table-column prop="pileInstalledPowerSum" align="center" sortable
          :label="$t('acChargingPileCapacity') + '(kW)'" />
        <el-table-column prop="directCurrentPileInstalledPowerSum" align="center" sortable
          :label="$t('dcChargingPileCapacity') + '(kW)'" />
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
    -webkit-backdrop-filter: blur(12px);
    /* 兼容 Safari */


    // .name-text {
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   white-space: nowrap;
    // }

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
            flex-shrink: 0;

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
                min-height: 30px;
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
    // max-width: 200px;
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
