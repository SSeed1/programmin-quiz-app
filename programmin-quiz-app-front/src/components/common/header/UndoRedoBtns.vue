<template>
  <div class="undo-redo-btns">
    <div class="undo-redo-btn undo-btn" :class="{'right-animated-click':isRightClick,'rigth-active-btn':isUndoStackActive}" @click="undo()"></div>
    <div class="vertical-divider"></div>
    <div class="undo-redo-btn redo-btn" :class="{'left-animated-click':isLeftClick, 'left-active-btn':isRedoStackActive}" @click="redo()"></div>
  </div>
</template>

<script>
export default {
  props: ['isUndoStackActive','isRedoStackActive'],
  data () {
    return{
      isRightClick: false,
      isLeftClick: false,
    }

  },
  watch: {
    isRightClick(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {this.isRightClick = false},100)
      } 
    },
    isLeftClick(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {this.isLeftClick = false},100)
      } 
    },
  },  
  methods: {
    undo(){
      this.isRightClick = true;
      this.$emit('undo')
    },
    redo(){
      this.isLeftClick = true;
      this.$emit('redo')
    }
  },
}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .undo-redo-btns {
    width: 89px;
    height: 44px;
    display: flex;
    border: 1px solid $grayBorderColor;
    border-radius: 4px;

    .undo-redo-btn {
      width: 44px;
      height: 100%;
      background-size: 24px 13px;
      background-position: center;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    .right-animated-click {
      border: 1px solid $appActionColor;
    }
    .rigth-active-btn {
      background-image: url('../../../assets/icons/undo-icon.svg') !important;
    }
    .left-animated-click {
      border: 1px solid $appActionColor;
    }
    .left-active-btn {
      background-image: url('../../../assets/icons/redo-icon.svg') !important;
    }
    .undo-btn {
      background-image: url('../../../assets/icons/undo-gray-icon.svg');
    }

    .redo-btn {
      background-image: url('../../../assets/icons/redo-gray-icon.svg');
    }

    .vertical-divider {
      width: 1px;
      height: 100%;
      background-color: $grayBorderColor;
    }
  }
</style>