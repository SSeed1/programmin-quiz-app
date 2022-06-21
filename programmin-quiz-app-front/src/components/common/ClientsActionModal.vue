<template>
  <ActionModal
    v-if="isModalShown"
    :width="'440px'"
    :height="'388px'"
    :isModalShown="isModalShown"
    :isLoading="isModalLoading"
  >
    <div class="modal-header">
      <div class="modal-title">Add new client</div>
      <div class="close-modal-btn" @click="$emit('hideModal')"></div>
    </div>
    <div class="modal-error">{{modalError}}</div>
    <div class="modal-content">
      <CommonInputField
        :width="'100%'"
        :height="'68px'"
        :inputHeight="'44px'"
        :lable="'Contact Name'"
        :placeholder="'Enter name'"
        :value="newProspectName"
        @updateValue="$emit('setNewClientName', $event)"
      />
      <CommonInputField
        :width="'100%'"
        :height="'68px'"
        :inputHeight="'44px'"
        :lable="'Company'"
        :placeholder="'Enter company'"
        :value="newProspectCompany"
        @updateValue="$emit('setNewClientCompany', $event)"
      />
    <ActionButton
      :width="'350px'"
      :height="'54px'"
      :text="'Add new client'"
      @click="$emit('createClient')"
    />
  </div>
  </ActionModal>
</template>

<script>
import ActionModal from './ActionModal.vue'
import ActionButton from './ActionButton.vue'
import ActionMenu from './actionMenu/ActionMenu.vue'
import ActionMenuItem from './actionMenu/ActionMenuItem.vue'
import CommonInputField from './CommonInputField.vue'

export default {
  props: [
    'isModalShown',
    'isModalLoading',
    'modalError',
    'newProspectName',
    'newProspectCompany',
    'newProspectStatus'
  ],
  components: {
    ActionModal,
    ActionButton,
    ActionMenu,
    ActionMenuItem,
    CommonInputField,
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styleVars.scss';

.modal-header {
  width: calc(100% - 80px);
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
}
</style>