<template>
  <div
    class="sublist-element"
    :class="{'sublist-active-state': isActive}"
  >
    <div class="sidebar-element-title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'isActive'
  ],
}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .sublist-element {
    width: 100%;
    height: 52px;
    padding-left: 69px;
    font-size: $fontSizeStandart;
    color: $fontColorSidebarGray;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

    .sublist-active-state {
      color: $fontColorWhite;
      background-color: $selectedBlackColor;
  }
  
</style>