<template>
  <div
    class="custom-checkbox"
    :class="{'checked-state': isCheckboxChecked}"
  >
  </div>
</template>

<script>
export default {
  props: ['isCheckboxChecked'],
}
</script>

<style lang="scss">
  @import '../../assets/styleVars.scss';

  .custom-checkbox {
    width: 18px;
    min-width: 18px;
    height: 18px;
    border: 1px solid $grayBorderColor;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .checked-state {
    background-size: 18px;
    background-color: $appActionColor;
    background-position: center;
    background-image: url('../../assets/icons/done-icon.svg');
  }
</style>