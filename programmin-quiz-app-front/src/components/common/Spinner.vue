<template>
  <div class="spinner-container" :style="{ 'height': containerHeight }">
    <div
      class="spinner"
      :style="{
        'width': width,
        'height': height,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  props: [
    'containerHeight',
    'width',
    'height',
  ],
}
</script>

<style lang="scss" scoped>
  @import '../../assets/styleVars.scss';

  .spinner-container {
    width: 100%;
    height: calc(100% - 104px);
    display: flex;
    justify-content: center;
    align-items: center;

    .spinner {
      border: 15px solid $grayBorderColor;
      border-radius: 50%;
      border-top: 15px solid $appActionColor;
      width: 30px;
      height: 30px;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
</style>