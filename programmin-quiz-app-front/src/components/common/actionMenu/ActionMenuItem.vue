<template>
  <div
    class="action-menu-element"
    :style="{
      'color': menuItemTextColor,
    }"
    @click="$emit('actionMenuItemClick', text)"
  >
    <div class="action-menu-item-text">
      {{text}}
    </div>
  </div>
  <div class="divider"></div>
</template>

<script>
export default {
  props: ['text'],
  emits: ['actionMenuItemClick'],
  data() {
    return {
      redTextOptions: ['Archive', 'Delete', 'Remove from pipeline','Stop subscription']
    }
  },
  computed: {
    menuItemTextColor() {
      if (this.redTextOptions.includes(this.text)) {
        return '#FF0000'
      } else {
        return '#171D35'
      }
    },
  },
}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .action-menu-element {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: $hoveredItemColor;
    }

    .action-menu-item-text {
      margin-left: 19px;
    }
  }

  .divider {
    width: 100%;
    height: 1px;
    background-color: $hoveredItemColor;
  }
</style>
