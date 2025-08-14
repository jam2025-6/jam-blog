<script setup lang="ts">
import { PanelTitle } from "@/components";
</script>
<template>
  <div class="power-curve">
    <PanelTitle title="新能源社会效益" />
    <div class="container">
      <div class="cell">
        <div class="cell-item">
          <svg-icon name="fdl" style="font-size: 48px; margin-right: 16px"></svg-icon>
          <div class="cell-item-main">
            <div class="name">新能源年发电量</div>
            <div class="value">
              <div class="value-num">456</div>
              <div class="value-unit">kW·h</div>
            </div>
          </div>
        </div>
        <div class="cell-item">
          <svg-icon name="yxxss" style="font-size: 48px; margin-right: 16px"></svg-icon>
          <div class="cell-item-main">
            <div class="name">新能源年发电量</div>
            <div class="value">
              <div class="value-name">光伏</div>
              <div class="number">
                <div class="value-num">456</div>
                <div class="value-unit">h</div>
              </div>
            </div>
            <div class="value">
              <div class="value-name">风电</div>
              <div class="number">
                <div class="value-num">456</div>
                <div class="value-unit">h</div>
              </div>
            </div>
          </div>
        </div>
        <div class="cell-item">
          <svg-icon name="zydl" style="font-size: 48px; margin-right: 16px"></svg-icon>
          <div class="cell-item-main">
            <div class="name">新能源年自用电量</div>
            <div class="value">
              <div class="value-num">456</div>
              <div class="value-unit">kW·h</div>
            </div>
          </div>
        </div>
        <div class="cell-item">
          <svg-icon name="swdl" style="font-size: 48px; margin-right: 16px"></svg-icon>
          <div class="cell-item-main">
            <div class="name">新能源年上网电量</div>
            <div class="value">
              <div class="value-num">456</div>
              <div class="value-unit">kW·h</div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-item">
          <div class="section-item-main">
            <div class="num">1000</div>
            <div class="unit">t</div>
          </div>
          <div class="section-item-text">减少碳排放</div>
        </div>
        <div class="section-item">
          <div class="section-item-main">
            <div class="num">1000</div>
            <div class="unit">t</div>
          </div>
          <div class="section-item-text">节约标准煤</div>
        </div>
        <div class="section-item">
          <div class="section-item-main">
            <div class="num">1000</div>
            <div class="unit">棵</div>
          </div>
          <div class="section-item-text">等效植树数</div>
        </div>
        <div class="section-item">
          <div class="section-item-main">
            <div class="num">1000</div>
            <div class="unit">张</div>
          </div>
          <div class="section-item-text">等效绿证数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.power-curve {
  height: 305px;
  width: 100%;
  .container {
    padding: 20px 0 13px 39px;
    width: calc(100%);
    height: calc(100% - 42px);
    .cell {
      display: flex;
      padding-left: 13px;
      align-items: flex-start;
      flex-wrap: wrap;
      width: 100%;
      gap: 16px 12px;
      &-item {
        // width: 50%;
        max-height: 64px;
        min-height: 48px;
        width: 190px;
        display: flex;
        align-items: flex-start;
        .name {
          padding-top: 3px;
          /* 二级标题投影 */
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
          font-family: "Alimama FangYuanTi VF";
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.2px;
          background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 2px;
        }
        .value {
          display: flex;
          align-items: baseline;
          background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          font-family: Rubik;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          .number {
            display: flex;
            align-items: baseline;
          }
          &-name {
            background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            margin-right: 5px;
            /* 二级标题投影 */
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
              0 0 10px rgba(48, 126, 229, 0.6);
            font-family: "HarmonyOS Sans SC";
            font-size: 12px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
            letter-spacing: 1.2px;
          }
          &-num {
            margin-right: 5px;
            font-size: 20px;
            letter-spacing: 2px;
          }
          &-unit {
            font-size: 12px;
            letter-spacing: 1.2px;
          }
        }
      }
    }
    .section {
      margin-top: 24px;
      display: flex;
      align-items: center;
      gap: 0 13px;
      height: 78px;
      &-item {
        &-main {
          margin-bottom: 12px;
          width: 92px;
          height: 51px;
          background-image: url("@/assets/icons/social.svg");
          display: flex;
          align-items: baseline;
          justify-content: center;
          .num {
            background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            /* 二级标题投影 */
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
              0 0 10px rgba(48, 126, 229, 0.6);
            font-family: Rubik;
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: 1.2px;
            margin-right: 4px;
          }
          .unit {
            background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;

            /* 二级标题投影 */
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
              0 0 10px rgba(48, 126, 229, 0.6);
            font-family: Rubik;
            font-size: 12px;
            font-style: normal;
            font-weight: 900;
            line-height: normal;
          }
        }
        &-text {
          background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;

          /* 二级标题投影 */
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
          font-family: "Alimama FangYuanTi VF";
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
