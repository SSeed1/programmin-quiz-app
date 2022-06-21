<template>
  <div
    class="reports-button"
    :style="{
      width: width,
      height: height,
    }"
    >

  </div>
</template>

<script>
export default {
  props: ['width', 'height']
}
</script>

<style lang="scss">
@import '../../assets/styleVars.scss';

.reports-button {
  margin-left: 10px;
  border: 1px solid $grayBorderColor;
  box-sizing: border-box;
  border-radius: 4px;
  background-size: 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('../../assets/icons/reports-btn-icon.svg');
  cursor: pointer;
}

</style>