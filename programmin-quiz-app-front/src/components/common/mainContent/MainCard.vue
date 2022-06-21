<template>
  <div class="main-card">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
  @import '../../../assets/styleVars.scss';

  .main-card {
    width: calc(100% - 120px);
    height: 566px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    margin: 0 60px;
    margin-top: 20px;
    border-radius: 4px;
    background-color: $whiteColor;
  }

  @media (max-width: 1024px) {
    .main-card {
      width: calc(100% - 20px);
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  @media (max-height: 900px) {
    .main-card {
      height: 566px;
    }
  }

  @media (max-width: 420px) {
    .main-card {
      overflow-x: scroll;
      overflow-y: scroll;
    }
  }
</style>