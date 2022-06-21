<template>
  <div class="dark-background" :class="{ 'visible-state': isModalShown }">
    <div
      class="action-modal"
      :style="{
        'width': width,
        'height': height,
      }"
    >
      <div class="modal-loading-overlay" v-if="isLoading">
        <Spinner />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Spinner from './Spinner.vue'

export default {
  props: ['width', 'height', 'isModalShown', 'isLoading'],
  components: {
    Spinner,
  },
}
</script>

<style lang="scss">
  @import '../../assets/styleVars.scss';

  .dark-background {
    position: fixed;
    z-index: 200;
    width: 0;
    height: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    .action-modal {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 4px;
      background-color: $whiteColor;

      .modal-loading-overlay {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.7);
        z-index: 1;
      }
    }
  }

  .visible-state {
    width: 100%;
    height: 100%;
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
    .dark-background {
      .action-modal {
        width: 350px !important;
      }
    }
  }
</style>