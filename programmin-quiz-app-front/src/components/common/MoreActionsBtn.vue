<template>
    <div
      class="more-actions-btn"
      :class="{ 'more-actions-btn-active-state': isActive }"
      :style="{
        'width': width,
        'height': height,
      }"
    >
    </div>
</template>

<script>
export default {
  props: [
    'width',
    'height',
    'isActive',
  ],
}
</script>

<style lang="scss">
  @import '../../assets/styleVars.scss';
  
  .more-actions-btn {
    margin-left: 10px;
    border: 1px solid $grayBorderColor;
    box-sizing: border-box;
    border-radius: 4px;
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../../assets/icons/more-gray-icon.svg');
    cursor: pointer;
  }

  .more-actions-btn-active-state {
    background-color: $whiteColor;
    background-image: url('../../assets/icons/more-orange-icon.svg') !important;
  }
</style>