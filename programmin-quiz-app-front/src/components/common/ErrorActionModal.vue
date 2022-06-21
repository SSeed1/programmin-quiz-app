<template>
  <ActionModal
    v-if="isModalShown"
    :width="'425px'"
    :height="'250px'"
    :isModalShown="isModalShown"
  >
  <div class="modal-header">
    <div class="header-title">
      <div class="error-icon"></div>
      <div class="title">Error</div>
    </div>
    <div class="close-modal-btn" @click="$emit('hideErrorModal')"></div>
  </div>
  <div class="error-container">
    <div class="error-icon"></div>
    <div class="error-title">{{pipelineErrorMessage}}</div>
    <ActionButton
      :width="'300px'"
      :height="'54px'"
      :text="'OK'"
      @click="$emit('hideErrorModal')"
    />
  </div>
  </ActionModal>
</template>

<script>
import ActionModal from './ActionModal.vue'
import ActionButton from './ActionButton.vue'
export default {
  props: [
    'isModalShown',
    'pipelineErrorMessage'
  ],
  components: {
    ActionModal,
    ActionButton,
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styleVars.scss';


.modal-header {
  width: calc(100% - 70px);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    .title {
      font-size: $fontSizeModalTitle;
      color: $fontColorBlack
    }
    .error-icon {
    background-repeat: no-repeat;
    background-position: center;
    width: 54px;
    height: 54px;
    background-image: url('../../assets/icons/error-icon.svg');
  }
  }
  .close-modal-btn {
    width: 24px;
    height: 24px;
    background-size: 14px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../../assets/icons/close-icon.svg');
    cursor: pointer;
  }

}
.error-container {
  width: 95%;
  margin-top:10x;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .error-icon {
    background-repeat: no-repeat;
    background-position: center;
    width: 54px;
    height: 54px;
    background-image: url('../../assets/icons/error-icon.svg');
  }
  .error-title {
    margin-top:40px;
    font-size: $fontSizeStandart;
    color: $redWarningColor;
  }
}

</style>
