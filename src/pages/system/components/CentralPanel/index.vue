<script setup lang="ts">
import Line from "./line.vue";
import Modal from "./modal.vue";
const point1 = [
  { x: 440, y: 448 },
  { x: 720, y: 285 },
  { x: 720, y: 220 },
];
const point2 = [
  { x: 480, y: 250 },
  { x: 630, y: 335 },
  { x: 720, y: 285 },
  { x: 720, y: 220 },
];
const point3 = [
  { x: 655, y: 425 },
  { x: 565, y: 375 },
  { x: 720, y: 285 },
  { x: 720, y: 220 },
];
const point4 = [
  { x: 730, y: 100 },
  { x: 890, y: 190 },
  { x: 720, y: 285 },
  { x: 720, y: 220 },
];
const point5 = [
  { x: 980, y: 140 },
  { x: 890, y: 190 },
  { x: 720, y: 285 },
  { x: 720, y: 220 },
];
const point6 = [
  { x: 945, y: 250 },
  { x: 865, y: 205 },
  { x: 720, y: 285 },
  { x: 720, y: 220 },
];
const modal1 = [
  {
    name: "充电功率",
    value: 12.4,
    unit: "kW",
  },
  {
    name: "储能SOC",
    value: 94,
    unit: "%",
  },
];
const modal2 = [
  {
    name: "日发电量",
    value: 12.4,
    unit: "kW·h",
  },
  {
    name: "日收益",
    value: 94,
    unit: "元",
  },
];
const modal3 = [
  {
    name: "上网电量",
    value: 12.4,
    unit: "kW·h",
  },
  {
    name: "日消纳量",
    value: 12.4,
    unit: "kW·h",
  },
  {
    name: "日收益",
    value: 94,
    unit: "元",
  },
];
const modal4 = [
  {
    name: "日用电量",
    value: 12.4,
    unit: "kW·h",
  },
];
const modal5 = [
  {
    name: "日充电量",
    value: 12.4,
    unit: "kW·h",
  },
  {
    name: "日充电收益",
    value: 94,
    unit: "元",
  },
];
const modal6 = [
  {
    name: "上网电量",
    value: 12.4,
    unit: "kW·h",
  },
  {
    name: "下网电量",
    value: 12.4,
    unit: "kW·h",
  },
];
</script>
<template>
  <div class="center-panel">
    <Line :status="true" :points="point1" />
    <Line :status="true" :points="point2" />
    <Line :status="true" :points="point3" />
    <Line :status="true" :forward="false" :points="point4" />
    <Line :status="true" :points="point5" />
    <Line :status="true" :points="point6" />
    <Modal title="储能" :list="modal1" :position="{ right: '807px', top: '149px' }" />
    <Modal title="风电" :list="modal2" :position="{ right: '617px', top: '0' }" />
    <Modal title="光伏" :list="modal3" :position="{ left: '784px', top: '70px' }" />
    <Modal title="负荷" :list="modal4" :position="{ left: '786px', top: '245px' }" />
    <Modal title="充电桩" :list="modal5" :position="{ left: '603px', top: '367px' }" />
    <Modal title="市电" :list="modal6" :position="{ right: '796px', top: '348px' }" />
    <div class="energy-storage">
      <img src="@/assets/images/station/energyStorage-active.png" alt="" />
      <!-- <div class="name">储能</div> -->
    </div>
    <div class="wind-power">
      <img src="@/assets/images/station/windPower-active.png" alt="" />
      <!-- <div class="name">风电</div> -->
    </div>
    <div class="photovoltaic">
      <img src="@/assets/images/station/photovoltaic-active.png" alt="" />
      <!-- <div class="name">光伏</div> -->
    </div>
    <div class="load">
      <img src="@/assets/images/station/load-active.png" alt="" />
      <!-- <div class="name">负荷</div> -->
    </div>
    <div class="charging-pile">
      <img src="@/assets/images/station/chargingPile-active.png" alt="" />
      <!-- <div class="name">充电桩</div> -->
    </div>
    <div class="electric-supply">
      <img src="@/assets/images/station/electricSupply-active.png" alt="" />
      <!-- <div class="name">市电</div> -->
    </div>
    <div class="advertising-board">
      <img src="@/assets/images/station/advertisingBoard.png" alt="" />
      <div class="value">
        <div class="name">新能源占比</div>
        <div class="num">89%</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.center-panel {
  width: 955px;
  height: 450px;
  // background-color: #fff;
  position: absolute;
  left: 472px;
  top: 203px;
  right: 493px;
  .energy-storage {
    position: absolute;
    left: 157px;
    top: 96px;
    .name {
      /* 倾斜效果：x 轴倾斜 15 度，y 轴不倾斜（可根据需求调整角度） */
      // transform: skew(52deg, -32deg);
      transform: skew(65deg, -31deg);
      text-align: center;
      /* 橙色文字投影 */
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(249, 243, 229, 0.36), 0 0 10px rgba(229, 145, 48, 0.6);
      font-family: "Alimama FangYuanTi VF";
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 1.6px;
      background: linear-gradient(211deg, #fcfbf7 18.65%, #f5e6cb 94.38%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: absolute;
      right: -26px;
      bottom: 2px;
    }
  }
  .wind-power {
    position: absolute;
    left: 342px;
    top: -27px;
  }
  .photovoltaic {
    position: absolute;
    left: 603px;
    top: 27px;
  }
  .load {
    position: absolute;
    left: 604px;
    top: 217px;
  }
  .charging-pile {
    position: absolute;
    left: 396px;
    top: 267px;
  }
  .electric-supply {
    position: absolute;
    left: 178px;
    top: 244px;
  }
  .advertising-board {
    position: absolute;
    left: 373px;
    top: 10px;
    .value {
      transform: translateY(-50%) skew(0deg, -29deg);
      position: absolute;
      top: 50%;
      left: 21px;
      display: flex;
      align-items: center;
      .name {
        text-align: center;
        background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        /* 二级标题投影 */
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
        font-family: "Alimama FangYuanTi VF";
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1.4px;
        margin-right: 5px;
      }
      .num {
        background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        /* 橙色文字投影 */
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(249, 243, 229, 0.36), 0 0 10px rgba(229, 145, 48, 0.6);
        font-family: Rubik;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 1.2px;
      }
    }
  }
}
</style>
