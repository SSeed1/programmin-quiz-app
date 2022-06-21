<template>
  <div
    class="action-menu"
    :class="{ 'action-menu-active-state': isActionMenuShown }"
    :style="{
      'width': width,
      'height': height,
      'top': top,
      'left': left,
      'right': right,
    }"
    ref="actionMenu"
  >
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
  props: ['width', 'height', 'top', 'left', 'right', 'isActionMenuShown'],
  setup(props, context) {
    const target = ref('actionMenu')

    onClickOutside(target, () => {
      context.emit('closeActionMenu')
    })

    return { target }
  }
}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .action-menu {
    display: none;
    position: absolute;
    right: 0;
    z-index: 2;
    border: 1px solid $grayBorderColor;
    border-radius: 4px;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
    background-color: $whiteColor;
    overflow: auto;
  }

  .action-menu-active-state {
    display: block;
    animation: fadeIn .3s;
    -webkit-animation: fadeIn .3s;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @media (max-width: 420px) {
    // .action-menu {
    //   width: 269px !important
    // }
  }
</style>