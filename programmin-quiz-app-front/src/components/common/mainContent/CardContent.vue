<template>
  <div class="card-content">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .card-content {
    width: calc(100% - 80px);
    overflow-y: scroll;
  }
</style>