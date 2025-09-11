<script setup lang="ts">
import { ref, computed } from "vue";
import { PanelTitle } from "@/components";
import { useLocaleStore } from "@/stores/modules/locale";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { getSearchById } from "@/api/system";
import { Microgrid } from "@/types/home";
import { convertEnergy } from '@/utils/tools'
const { isChinese } = storeToRefs(useLocaleStore());
const route = useRoute();
const formData = ref<Microgrid>({
  id: "",
  microgridCode: "",
  microgridName: "",
  voltageLevel: "",
  transformerCapacity: 0,
  pvInstalledPowerSum: 0,
  windCapacitySum: 0,
  installedPowerSum: 0,
  installedCapacitySum: 0,
  pileInstalledPowerSum: 0,
  directCurrentPileInstalledPowerSum: 0,
  stationCount: 0,
  children: [],
  microgridAbbreviation: ''
});
const maxLength = computed(() => {
  const max = Math.max(
    (formData.value.voltageLevel + "").length,
    (formData.value.transformerCapacity + "").length,
    (formData.value.pvInstalledPowerSum + "").length
  );
  return max;
});
const loading = ref(false);
async function getData() {
  try {
    loading.value = true;
    const id = route.query.id as string;
    if (!id) {
      return;
    }
    const res = await getSearchById(id);
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
  <div class="basic-info" :class="{
    'en': !isChinese,
  }">
    <PanelTitle :title="$t('basicInfo')" />
    <div v-loading="loading" class="container">
      <div class="pic">
        <div class="pic-item">
          <div class="pic-item-main valtafe" :class="{
            'mb-8': isChinese,
          }">
            <div class="word">
              <div :style="{
                fontSize: 30 - maxLength + 'px',
              }">
                {{ formData.voltageLevel }}
              </div>
              <div>kV</div>
            </div>
          </div>
          <div class="pic-item-title valtafe" :style="{
            'letter-spacing': isChinese ? '1.4px' : '1px',
          }">
            {{ $t("voltageLevel") }}
          </div>
        </div>
        <div class="pic-item">
          <div class="pic-item-main transformer" :class="{
            'mb-8': isChinese,
          }">
            <div class="word">
              <div :style="{
                fontSize: 30 - maxLength + 'px',
              }">
                {{ formData.transformerCapacity }}
              </div>
              <div>kVA</div>
            </div>
          </div>
          <div class="pic-item-title transformer" :style="{
            'letter-spacing': isChinese ? '1.4px' : '1px',
          }">
            {{ $t("transformerCapacity") }}
          </div>
        </div>
        <div class="pic-item">
          <div class="pic-item-main photovoltaic" :class="{
            'mb-8': isChinese,
          }">
            <div class="word">
              <div :style="{
                fontSize: 30 - maxLength + 'px',
              }">
                {{ formData.pvInstalledPowerSum }}
              </div>
              <div>kW</div>
            </div>
          </div>
          <div class="pic-item-title photovoltaic" :style="{
            'letter-spacing': isChinese ? '1.4px' : '1px',
          }">
            {{ $t("pvCapacity") }}
          </div>
        </div>
      </div>

      <div class="info">
        <div class="info-item">
          <svg-icon name="wind-power" style="font-size: 36px; margin-right: 11px" />
          <div class="info-item-word">
            <div class="info-item-word-title">{{ $t("windPowerCapacity") }}</div>
            <div class="info-item-word-value">
              <div class="info-item-word-value-num">{{ formData.windCapacitySum }}</div>
              <div class="info-item-word-value-unit">kW</div>
            </div>
          </div>
        </div>
        <div class="info-item">
          <svg-icon name="stored-energy" style="font-size: 36px; margin-right: 11px" />
          <div class="info-item-word">
            <div class="info-item-word-title">{{ $t("energyStorageCapacity") }}</div>
            <div class="info-item-word-value">
              <!-- 装机功率(MW) -->
              <div class="info-item-word-value-num">{{ formData.installedPowerSum }}</div>
              <div class="info-item-word-value-unit">kW</div>
              <div class="info-item-word-value-sub">/</div>
              <!-- 装机容量(MWh) -->
              <div class="info-item-word-value-num">{{ convertEnergy(formData.installedCapacitySum).value }}</div>
              <div class="info-item-word-value-unit">{{ convertEnergy(formData.installedCapacitySum).unit }}</div>
            </div>
          </div>
        </div>
        <div class="info-item">
          <svg-icon name="charging-pile" style="font-size: 36px; margin-right: 11px" />
          <div class="info-item-word">
            <div class="info-item-word-title">{{ $t("dcChargingPileCapacity") }}</div>
            <div class="info-item-word-value">
              <div class="info-item-word-value-num">{{ formData.pileInstalledPowerSum }}</div>
              <div class="info-item-word-value-unit">kW</div>
            </div>
          </div>
        </div>
        <div class="info-item">
          <svg-icon name="charging-pile" style="font-size: 36px; margin-right: 11px" />
          <div class="info-item-word">
            <div class="info-item-word-title">{{ $t("acChargingPileCapacity") }}</div>
            <div class="info-item-word-value">
              <div class="info-item-word-value-num">{{ formData.directCurrentPileInstalledPowerSum }}</div>
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

  &.en {
    .info {
      .info-item-word-title {
        // letter-spacing: 0px;
      }
    }
  }

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
          //
          height: calc(100% - 25px);
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          .word {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);

            >div:first-child {
              text-align: center;
              font-family: Rubik;
              font-size: 28px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              letter-spacing: 1.4px;
            }

            >div:last-child {
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
              >div:first-child {
                /* 二级标题投影 */
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36),
                  0 0 10px rgba(48, 126, 229, 0.6);
                background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }

              >div:last-child {
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
              >div:first-child {
                /* 二级标题投影 */
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 249, 242, 0.36),
                  0 0 10px rgba(48, 229, 184, 0.6);
                background: linear-gradient(211deg, #f7fcfa 18.65%, #cbf5e2 94.38%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }

              >div:last-child {
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
              >div:first-child {
                /* 二级标题投影 */
                text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(249, 243, 229, 0.36),
                  0 0 10px rgba(229, 145, 48, 0.6);
                background: linear-gradient(211deg, #f7fcfa 18.65%, #f5e6cb 94.38%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }

              >div:last-child {
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
          // height: 17px;
          text-align: center;
          /* 二级标题投影 */
          font-family: "Alimama FangYuanTi VF";
          font-size: 14px;
          font-style: normal;
          font-variation-settings: "BEVL" 1, "wght" 700;
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
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 16px 0;

      &-item {
        white-space: nowrap;
        // width: 50%;
        min-width: 190px;
        display: flex;
        align-items: center;

        &-word {
          width: calc(100% - 47px);
          white-space: nowrap;

          &-title {
            white-space: nowrap;
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

            >div {
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
