<template>
  <div class="main-card-header">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "../../../assets/styleVars.scss";

.main-card-header {
  width: 100%;
  height: 136px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
</style>
