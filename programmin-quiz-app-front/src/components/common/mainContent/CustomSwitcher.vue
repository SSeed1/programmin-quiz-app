<template>
  <div class="switcher" :class="{ 'switcher-active-state': isSwitcherChecked, 'switcher-locked': isLocked }">
    <div class="line">
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isSwitcherChecked', 'isLocked'],
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styleVars.scss";

.switcher {
  height: 100%;
  width: 34px;
  display: flex;
  align-items: center;

  .line {
    width: 100%;
    height: 14px;
    background: $mainBackgroundColor;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    position: relative;
    border-radius: 34px;

    .circle {
      position: absolute;
      width: 20px;
      height: 20px;
      top: calc(50% - 10px);
      border-radius: 50%;
      background-color: #edeff3;
      cursor: pointer;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12),
                  0px 2px 2px rgba(0, 0, 0, 0.24);
    }
  }
}

.switcher-active-state {
  .line {
    background: $appActionColorHovered;

    .circle {
      background-color: $appActionColor;
      -webkit-transition: 0.4s;
      transition: 0.4s;
      -webkit-transform: translateX(16px);
      -ms-transform: translateX(16px);
      transform: translateX(16px);
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12),
                  0px 2px 2px rgba(0, 0, 0, 0.24);
    }
  }
}

.switcher-locked {
  cursor: not-allowed;

  .circle {
    cursor: not-allowed !important;
  }
}
</style>
