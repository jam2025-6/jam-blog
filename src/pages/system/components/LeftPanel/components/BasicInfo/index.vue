<script setup lang="ts">
import { PanelTitle } from "@/components";
</script>
<template>
  <div class="basic-info">
    <PanelTitle title="基本信息" />
    <div class="container">
      <div class="pic">
        <div class="pic-item">
          <div class="pic-item-main valtafe">
            <div class="word">
              <div>0.4</div>
              <div>kV</div>
            </div>
          </div>
          <div class="pic-item-title valtafe">电压等级</div>
        </div>
        <div class="pic-item">
          <div class="pic-item-main transformer">
            <div class="word">
              <div>500</div>
              <div>kVA</div>
            </div>
          </div>
          <div class="pic-item-title transformer">变压器容量</div>
        </div>
        <div class="pic-item">
          <div class="pic-item-main photovoltaic">
            <div class="word">
              <div>300</div>
              <div>kW</div>
            </div>
          </div>
          <div class="pic-item-title photovoltaic">光伏容量</div>
        </div>
      </div>

      <div class="info">
        <div class="info-item">
          <svg-icon name="wind-power" style="font-size: 36px; margin-right: 11px" />
          <div class="info-item-word">
            <div class="info-item-word-title">风电容量</div>
            <div class="info-item-word-value">
              <div class="info-item-word-value-num">5</div>
              <div class="info-item-word-value-unit">kV</div>
            </div>
          </div>
        </div>
        <div class="info-item">
          <svg-icon name="stored-energy" style="font-size: 36px; margin-right: 11px" />
          <div class="info-item-word">
            <div class="info-item-word-title">储能容量</div>
            <div class="info-item-word-value">
              <div class="info-item-word-value-num">60</div>
              <div class="info-item-word-value-unit">kV</div>
              <div class="info-item-word-value-sub">/</div>
              <div class="info-item-word-value-num">107</div>
              <div class="info-item-word-value-unit">kWh</div>
            </div>
          </div>
        </div>
        <div class="info-item">
          <svg-icon name="charging-pile" style="font-size: 36px; margin-right: 11px" />
          <div class="info-item-word">
            <div class="info-item-word-title">直流充电桩</div>
            <div class="info-item-word-value">
              <div class="info-item-word-value-num">140</div>
              <div class="info-item-word-value-unit">kW</div>
            </div>
          </div>
        </div>
        <div class="info-item">
          <svg-icon name="charging-pile" style="font-size: 36px; margin-right: 11px" />
          <div class="info-item-word">
            <div class="info-item-word-title">交流充电桩</div>
            <div class="info-item-word-value">
              <div class="info-item-word-value-num">35</div>
              <div class="info-item-word-value-unit">kW</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basic-info {
  height: 315px;
  width: 100%;
  .container {
    height: calc(100% - 42px);
    width: 100%;
    padding: 8px 0 31px 40px;
    .pic {
      display: flex;
      width: 100%;
      height: 126px;
      margin-bottom: 20px;
      &-item {
        width: 97px;
        margin-right: 42px;
        height: 126px;
        &-main {
          margin-bottom: 8px;
          height: calc(100% - 25px);
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          .word {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            > div:first-child {
              text-align: center;
              font-family: Rubik;
              font-size: 28px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              letter-spacing: 1.4px;
            }
            > div:last-child {
              text-align: center;

              font-family: Rubik;
              font-size: 12px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
            }
          }
          &.valtafe {
            background-image: url("@/assets/icons/voltafe-classses.svg");
            background-repeat: no-repeat;
            .word {
              > div:first-child {
                /* 二级标题投影 */
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
                  0 0 10px rgba(48, 126, 229, 0.6);
                background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              > div:last-child {
                /* 二级标题投影 */
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
                  0 0 10px rgba(48, 126, 229, 0.6);
                background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            &::before {
              content: "";
              display: inline-block;
              background-image: url("@/assets/icons/voltafe-classses-operture.svg");
              height: 84px;
              width: 78px;
              transform: rotate(90deg);
            }
          }
          &.transformer {
            background-image: url("@/assets/icons/transformer-capacity.svg");
            background-repeat: no-repeat;
            .word {
              > div:first-child {
                /* 二级标题投影 */
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 249, 242, 0.36),
                  0 0 10px rgba(48, 229, 184, 0.6);
                background: linear-gradient(211deg, #f7fcfa 18.65%, #cbf5e2 94.38%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              > div:last-child {
                /* 二级标题投影 */
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 249, 242, 0.36),
                  0 0 10px rgba(48, 229, 184, 0.6);
                background: linear-gradient(211deg, #f7fcfa 18.65%, #cbf5e2 94.38%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            &::before {
              content: "";
              display: inline-block;
              background-image: url("@/assets/icons/transformer-capacity-operture.svg");
              height: 84px;
              width: 78px;
              transform: rotate(90deg);
            }
          }
          &.photovoltaic {
            background-image: url("@/assets/icons/photovoltaic-capacity.svg");
            background-repeat: no-repeat;
            .word {
              > div:first-child {
                /* 二级标题投影 */
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(249, 243, 229, 0.36),
                  0 0 10px rgba(229, 145, 48, 0.6);
                background: linear-gradient(211deg, #f7fcfa 18.65%, #f5e6cb 94.38%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              > div:last-child {
                /* 二级标题投影 */
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(249, 243, 229, 0.36),
                  0 0 10px rgba(229, 145, 48, 0.6);
                background: linear-gradient(211deg, #f7fcfa 18.65%, #f5e6cb 94.38%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
            &::before {
              content: "";
              display: inline-block;
              background-image: url("@/assets/icons/photovoltaic-capacity-operture.svg");
              height: 84px;
              width: 78px;
              transform: rotate(90deg);
            }
          }
        }
        &-title {
          height: 17px;
          text-align: center;
          /* 二级标题投影 */
          font-family: "Alimama FangYuanTi VF";
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: normal;
          letter-spacing: 1.4px;
          &.valtafe {
            background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
              0 0 10px rgba(48, 126, 229, 0.6);
          }
          &.transformer {
            background: linear-gradient(211deg, #f7fcfa 18.65%, #cbf5e2 94.38%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 249, 242, 0.36),
              0 0 10px rgba(48, 229, 184, 0.6);
          }
          &.photovoltaic {
            background: linear-gradient(211deg, #fcfbf7 18.65%, #f5e6cb 94.38%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(249, 243, 229, 0.36),
              0 0 10px rgba(229, 145, 48, 0.6);
          }
        }
      }
    }
    .info {
      padding-left: 7px;
      width: 365px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px 0;
      &-item {
        width: 50%;
        display: flex;
        align-items: center;
        &-word {
          width: calc(100% - 47px);
          white-space: nowrap;
          &-title {
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
            margin-bottom: 4px;
          }
          &-value {
            display: flex;
            align-items: baseline;
            > div {
              background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              leading-trim: both;
              text-edge: cap;
              font-family: Rubik;
              font-size: 16px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
            }
            &-num {
              font-size: 16px;
              margin-right: 5px;
              letter-spacing: 1.6px;
            }
            &-sub {
              font-size: 16px;
              margin: 0 5px;
            }
            &-unit {
              font-size: 12px;
              font-style: normal;
              letter-spacing: 0.6px;
            }
          }
        }
      }
    }
  }
}
</style>
