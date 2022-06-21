<template>
  <div
    class="action-button"
    :style="{
      width: width,
      height: height,
      'min-height': minHeight,
    }"
  >
    {{text}}
  </div>
</template>

<script>
export default {
  props: ['width', 'height', 'minHeight', 'text']
}
</script>

<style lang='scss'>
  @import '../../assets/styleVars.scss';

  .action-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $appActionColor;
    color: $fontColorWhite;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 4px;
    font-size: $fontSizeStandart;

    &:hover {
      background-color: $appActionColorHovered;
    }
  }
</style>