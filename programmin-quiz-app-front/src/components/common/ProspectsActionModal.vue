<template>
  <ActionModal
    v-if="isModalShown"
    :width="'440px'"
    :height="'468px'"
    :isModalShown="isModalShown"
    :isLoading="isModalLoading"
  >
    <div class="modal-header">
      <div class="modal-title">Add new prospect</div>
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
        @updateValue="$emit('setNewProspectName', $event)"
      />
      <CommonInputField
        :width="'100%'"
        :height="'68px'"
        :inputHeight="'44px'"
        :lable="'Company'"
        :placeholder="'Enter company'"
        :value="newProspectCompany"
        @updateValue="$emit('setNewProspectCompany', $event)"
      />
      <div class="prospect-status-wrapper">
        <div class="field-label">Status</div>
        <div class="prospect-status-field" @click="openStatusDropdown">
          {{newProspectStatus}}
          <div
            class="open-dropdown-btn"
            :class="{'close-dropdown-btn': isStatusDropdownOpened}"
          >
          </div>
        </div>
        <ActionMenu
          :width="'360px'"
          :height="'196px'"
          :top="'72px'"
          :isActionMenuShown="isStatusDropdownOpened"
          @closeActionMenu="closeStatusDropdown"
        >
          <ActionMenuItem
            v-for="(value, name, index) in prospectStatus"
            :key="index"
            :text="name"
            @actionMenuItemClick="$emit('setNewProspectStatus', name)"
          />
        </ActionMenu>
      </div>
    </div>
    <ActionButton
      :width="'350px'"
      :height="'54px'"
      :text="'Add new prospect'"
      @click="$emit('createProspect')"
    />
  </ActionModal>
</template>

<script>
import ActionModal from './ActionModal.vue'
import ActionButton from './ActionButton.vue'
import ActionMenu from './actionMenu/ActionMenu.vue'
import ActionMenuItem from './actionMenu/ActionMenuItem.vue'
import CommonInputField from './CommonInputField.vue'

import { ProspectStatus } from '../../utils/constants'

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
  data() {
    return {
      prospectStatus: ProspectStatus,
      isStatusDropdownOpened: false,
    }
  },
  methods: {
    openStatusDropdown() {
      this.isStatusDropdownOpened = true
    },
    closeStatusDropdown() {
      this.isStatusDropdownOpened = false
    },
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

  .prospect-status-wrapper {
    width: 100%;
    height: 68px;
    position: relative;

    .field-label {
      color: $fontColorBlack;
      font-size: $fontSizeMinified;
    }

    .prospect-status-field {
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      margin-top: 8px;
      padding: 0 6px;
      position: relative;
      font-size: $fontSizeStandart;
      border: 1px solid $grayBorderColor;
      box-sizing: border-box;
      border-radius: 4px;
      cursor: pointer;

      .open-dropdown-btn {
        width: 20px;
        height: 20px;
        top: 12px;
        right: 19px;
        position: absolute;
        background-position: center;
        background-size: 20px;
        background-repeat: no-repeat;
        background-image: url('../../assets/icons/chevron-down-black-icon.svg');
      }

      .close-dropdown-btn {
        background-image: url('../../assets/icons/chevron-up-black-icon.svg');
      }
    }
  }
}
</style>