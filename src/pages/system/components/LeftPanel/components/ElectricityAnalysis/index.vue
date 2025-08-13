<script setup lang="ts">
import { PanelTitle, SemiCircleProgress } from "@/components";
</script>
<template>
  <div class="electricity-analysis">
    <PanelTitle title="用电情况分析" />
    <div class="container">
      <div class="cell">
        <div class="cell-item">
          <svg-icon name="year" style="font-size: 42px; margin-right: 4px; margin-left: 6px" />
          <div class="info">
            <div class="name">年用电量</div>
            <div class="value">
              <div class="num">40.5</div>
              <div class="unit">MW·h</div>
            </div>
          </div>
        </div>

        <div class="cell-item">
          <svg-icon name="month" style="font-size: 42px; margin-right: 4px; margin-left: 6px" />
          <div class="info">
            <div class="name">月用电量</div>
            <div class="value">
              <div class="num">40.5</div>
              <div class="unit">MW·h</div>
            </div>
          </div>
        </div>
        <div class="cell-item">
          <svg-icon name="day" style="font-size: 42px; margin-right: 4px; margin-left: 6px" />
          <div class="info">
            <div class="name">日用电量</div>
            <div class="value">
              <div class="num">40.5</div>
              <div class="unit">MW·h</div>
            </div>
          </div>
        </div>
        <div class="cell-item">
          <svg-icon name="demand" style="font-size: 42px; margin-right: 4px; margin-left: 6px" />
          <div class="info">
            <div class="name">当月需量</div>
            <div class="value">
              <div class="num">40.5</div>
              <div class="unit">MW·h</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rate">
        <div class="rate-item">
          <div class="rate-item-pic"></div>
          <div class="rate-item-main">
            <div class="item">
              <div class="point"></div>
              <div class="name">电网月供电</div>
              <div class="value">
                <div class="num">40.5</div>
                <div class="unit">MW·h</div>
              </div>
              <div class="percent">（50%）</div>
            </div>
            <div class="item orange">
              <div class="point"></div>
              <div class="name">新能源年消纳</div>
              <div class="value">
                <div class="num">40.5</div>
                <div class="unit">MW·h</div>
              </div>
              <div class="percent">（50%）</div>
            </div>
          </div>
          <!-- <SemiCircleProgress :progress="85" title="月对比" :size="100" progress-color="#2196F3" /> -->
        </div>
        <div class="rate-item">
          <div class="rate-item-pic"></div>
          <div class="rate-item-main">
            <div class="item">
              <div class="point"></div>
              <div class="name">电网月供电</div>
              <div class="value">
                <div class="num">40.5</div>
                <div class="unit">MW·h</div>
              </div>
              <div class="percent">（50%）</div>
            </div>
            <div class="item orange">
              <div class="point"></div>
              <div class="name">新能源年消纳</div>
              <div class="value">
                <div class="num">40.5</div>
                <div class="unit">MW·h</div>
              </div>
              <div class="percent">（50%）</div>
            </div>
          </div>
          <!-- <SemiCircleProgress :progress="85" title="月对比" :size="100" progress-color="#2196F3" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.electricity-analysis {
  height: 348px;
  width: 100%;
  .container {
    padding: 19px 0 19px 39px;
    .cell {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 16px 20px;
      &-item {
        background-image: url("@/assets/images/system/electricity-cell-heigher.png");
        width: 183px;
        height: 48px;
        display: flex;
        align-items: center;
        .info {
          width: calc(100% - 52px);
          .value {
            display: flex;
            align-items: baseline;
          }
        }
        // padding: 0 10px;
        .name {
          background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          /* 二级标题投影 */
          text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
          font-family: "HarmonyOS Sans SC";
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.6px;
          margin-bottom: 4px;
        }
        .num {
          background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          leading-trim: both;
          text-edge: cap;
          font-family: Rubik;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.4px;
          margin-right: 4px;
        }
        .unit {
          background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          leading-trim: both;
          text-edge: cap;
          font-family: Rubik;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 0.6px;
        }
      }
    }
    .rate {
      padding-left: 11px;
      &-item {
        height: 58px;
        width: 100%;
        margin-top: 19px;
        // background-color: #fdf;
        display: flex;
        align-items: center;
        &-pic {
          flex: 1;
        }
        &-main {
          width: calc(100% - 148px);
          .item {
            display: flex;
            align-items: center;
            height: 14px;
            &.orange {
              .point {
                background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
              }
              .value,
              .percent {
                background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            &:first-child {
              margin-bottom: 10px;
            }
            .point {
              background: linear-gradient(220deg, #26cefd 7.64%, #2b8ef3 100.06%);
              width: 6px;
              height: 6px;
              border-radius: 50%;
              margin-right: 11px;
            }
            .name {
              background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              /* 二级标题投影 */
              text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
                0 0 10px rgba(48, 126, 229, 0.6);
              font-family: "HarmonyOS Sans SC";
              font-size: 12px;
              font-style: normal;
              font-weight: 900;
              line-height: normal;
              letter-spacing: 0.6px;
              margin-right: 6px;
            }
            .value {
              display: flex;
              align-items: baseline;
              background: linear-gradient(220deg, #26cefd 7.64%, #2b8ef3 100.06%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-family: Rubik;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              .num {
                font-size: 14px;
                letter-spacing: 1.4px;
                margin-right: 4px;
              }
              .unit {
                font-size: 12px;
                margin-right: 4px;
                letter-spacing: 0.6px;
              }
            }
            .percent {
              background: linear-gradient(220deg, #26cefd 7.64%, #2b8ef3 100.06%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-family: Rubik;
              font-size: 14px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              letter-spacing: 1.4px;
            }
          }
        }
      }
    }
  }
}
</style>
