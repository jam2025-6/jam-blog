<script setup lang="ts"></script>
<template>
  <div class="indicator-card">
    <div class="item">
      <div class="item-title">累计节约电量</div>
      <div class="item-indicator">
        <div class="item-indicator-num">40.7</div>
        <div class="item-indicator-unit">kW·h</div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">累计新能源消纳占比</div>
      <div class="item-indicator">
        <div class="item-indicator-num">40.7</div>
        <div class="item-indicator-unit">%</div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">累计系统收益</div>
      <div class="item-indicator">
        <div class="item-indicator-num">400</div>
        <div class="item-indicator-unit">元</div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">投资回收期</div>
      <div class="item-indicator">
        <div class="item-indicator-num">2</div>
        <div class="item-indicator-unit">年</div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">减碳</div>
      <div class="item-indicator">
        <div class="item-indicator-num orange">100</div>
        <div class="item-indicator-unit orange">t</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.indicator-card {
  width: 890px;
  height: 76px;
  border-radius: 20px;
  border-bottom: 2px solid #115199;
  background: linear-gradient(180deg, rgba(15, 75, 156, 0.02) 0%, rgba(5, 17, 42, 0.03) 100%);
  backdrop-filter: blur(12px);
  position: absolute;
  top: 109px;
  left: 515px;
  right: 515px;
  display: flex;
  padding-top: 16px;
  justify-content: center;
  gap: 0 52px;
  .item {
    &-title {
      background: linear-gradient(211deg, #f7fcfa 18.65%, #cbdaf5 94.38%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      /* 二级标题投影 */
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4), 0 0 6px rgba(229, 239, 249, 0.36), 0 0 10px rgba(48, 126, 229, 0.6);
      font-family: "Alimama FangYuanTi VF";
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 1.6px;
      margin-bottom: 4px;
    }
    &-indicator {
      display: flex;
      align-items: baseline;

      &-num {
        background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-family: Rubik;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 2px;
        margin-right: 5px;
        &.orange {
          background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
          background-clip: text;
          -webkit-background-clip: text;
        }
      }
      &-unit {
        background: linear-gradient(51deg, #e5b02b 6.53%, #ead08f 88.38%);
        background-clip: text;
        -webkit-background-clip: text;
        font-family: Rubik;
        font-size: 12px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.6px;
        -webkit-text-fill-color: transparent;
        &.orange {
          background: linear-gradient(231deg, #f5b04f 0.05%, #fe9347 113.94%);
          background-clip: text;
          -webkit-background-clip: text;
        }
      }
    }
  }
}
</style>
