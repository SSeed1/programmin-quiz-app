<template>
  <div class="main-header">
    <slot></slot>
  </div>  
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .main-header {
    width: calc(100% - 120px);
    height: 160px;
    min-height: 160px;
    margin: 0 60px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  @media (max-width: 1024px) {
    .main-header {
      width: calc(100% - 20px);
      margin-left: 10px;
      margin-right: 10px;
    }
  }
</style>