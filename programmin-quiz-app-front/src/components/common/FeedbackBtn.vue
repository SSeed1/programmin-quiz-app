<template>
  <div class="feedback-btn" @click="openFeedbackModal">
    Send feedback
    <ActionModal
      v-if="isModalShown"
      :width="'440px'"
      :height="'468px'"
      :isModalShown="isModalShown"
      :isLoading="isModalLoading"
    >
      <div class="modal-header">
        <div class="modal-title">Send feedback</div>
        <div class="close-modal-btn" @click="closeFeedbackModal"></div>
      </div>
      <div class="modal-error">{{modalError}}</div>
      <div class="modal-content">
        <textarea
          class="feedback-texarea"
          autofocus
          v-model="feedbackText"
          placeholder="Enter details of an issue or improvement here"
        >
        </textarea>
      </div>
      <ActionButton
        :width="'350px'"
        :height="'54px'"
        :text="'Send feedback'"
        @click="handleFeedbackSending"
      />
    </ActionModal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ActionModal from './ActionModal.vue';
import ActionButton from './ActionButton.vue'

export default {
  components: {
    ActionModal,
    ActionButton,
  },
  data() {
    return {
      isModalShown: false,
      isModalLoading: false,
      feedbackText: '',
      modalError: '',
    }
  },
  methods: {
    ...mapActions([
      'sendFeedback',
    ]),
    openFeedbackModal() {
      this.isModalShown = true
    },
    closeFeedbackModal(evt) {
      evt.stopPropagation()
      this.isModalShown = false
      this.isModalLoading = false
      this.feedbackText = ''
      this.modalError = ''
    },
    async handleFeedbackSending() {
      if (!this.feedbackText.length) {
        this.modalError = 'Empty feedback is not allowed'
        return
      }

      this.isModalLoading = true

      try {
        await this.sendFeedback(this.feedbackText)
        this.feedbackText = ''
        this.isModalShown = false
      } catch (error) {
        this.modalError = 'Something went wrong, please, try again'
      } finally {
        this.isModalLoading = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/styleVars.scss';

  .feedback-btn {
    position: absolute;
    bottom: 0;
    height: 52px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    font-size: $fontSizeStandart;
    cursor: pointer;

    .modal-header {
      width: calc(100% - 80px);
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $fontColorBlack !important;

      .modal-title {
        font-size: $fontSizeModalTitle;
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

    .modal-error {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      color: $redWarningColor;
      font-size: $fontSizeMinified;
    }

    .modal-content {
      width: calc(100% - 80px);
      height: 248px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;

      .feedback-texarea {
        width: 100%;
        height: 100%;
        margin-top: 10px;
        padding: 4px;
        box-sizing: border-box;
        font-size: $fontSizeStandart;
        outline: none;
        resize: none;
      }
    }
  }
</style>