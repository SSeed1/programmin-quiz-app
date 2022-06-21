<template>
  <div class="card-row">
    <div class="drag-handle" v-if="order === ''"></div>
    <CustomCheckbox
      v-if="isCheckboxShown"
      :isCheckboxChecked="isCheckboxChecked"
      @click="handleCheckboxClick"
    />
    <EditableField
      v-if="name && isNameEditable"
      :value="name"
      :isSubscriptionActive="isSubscriptionActive"
      @valueUpdated="$emit('updateName', $event)"
    />
    <div
      v-if="name && !isNameEditable"
      class="not-editable-field">
      {{name}}
    </div>
    <EditableField
      v-if="company && isCompanyEditable"
      :value="company"
      :isSubscriptionActive="isSubscriptionActive"
      @valueUpdated="$emit('updateCompany', $event)"
    />
    <div
      v-if="company && !isCompanyEditable"
      class="not-editable-field">
      {{company}}
    </div>
    <div
      v-if="statuses"
      class="prospect-statuses-btns"
    >
      <div
        class="prospect-status-btn"
        :class="{'active-radio-btn': currentItemStatus === status}"
        v-for="(status, index) in statuses"
        :key="index"
        @click="$emit('updateStatus', status)"
      >
      </div>
    </div>
    <div class="action-btn-container">
      <MoreActionsBtn
        :width="'32px'"
        :height="'32px'"
        :isActive="isActionMenuShown"
        @click="switchActionMenuState"
      />
      <ActionMenu
        :width="actionMenuWidth"
        :height="actionMenuHeight"
        :top="actionMenuTop"
        :isActionMenuShown="isActionMenuShown"
        @closeActionMenu="closeActionMenu"
      >
        <ActionMenuItem
          v-for="(action, index) in menuActions"
          :key="index"
          :text="action"
          @actionMenuItemClick="handleActionMenuItemClick"
        />
      </ActionMenu>
    </div>
  </div>
</template>

<script>
import CustomCheckbox from '../CustomCheckbox.vue'
import EditableField from '../EditableField.vue'
import MoreActionsBtn from '../MoreActionsBtn.vue'
import ActionMenu from '../actionMenu/ActionMenu.vue'
import ActionMenuItem from '../actionMenu/ActionMenuItem.vue'
import CustomSwitcher from '../mainContent/CustomSwitcher.vue'

export default {
  props: [
    'id',
    'order',
    'isCheckboxShown',
    'selectedRows',
    'name',
    'company',
    'statuses',
    'currentItemStatus',
    'menuActions',
    'actionMenuWidth',
    'actionMenuHeight',
    'actionMenuTop',
    'isNameEditable',
    'isCompanyEditable',
    'isSubscriptionActive',
  ],
  components: {
    CustomCheckbox,
    EditableField,
    MoreActionsBtn,
    ActionMenu,
    ActionMenuItem,
    CustomSwitcher,
  },
  data() {
    return {
      isCheckboxChecked: false,
      isActionMenuShown: false,
    }
  },
  created() {
    this.isCheckboxChecked = this.selectedRows.includes(this.id)
  },
  watch: {
    selectedRows(newValue, _) {
      if (newValue.includes(this.id)) this.isCheckboxChecked = true
      else this.isCheckboxChecked = false
    },
  },
  methods: {
    handleCheckboxClick() {
      if (this.isCheckboxChecked) {
        this.isCheckboxChecked = false
        this.$emit('removeSelection')
      } else {
        this.isCheckboxChecked = true
        this.$emit('checkboxSelect')
      }
    },
    switchActionMenuState() {
      if (!this.isSubscriptionActive) return
      if (this.isActionMenuShown) this.isActionMenuShown = false
      else this.isActionMenuShown = true
    },
    closeActionMenu() {
      this.isActionMenuShown = false
    },
    handleActionMenuItemClick(action) {
      this.isActionMenuShown = false
      this.$emit('actionMenuItemClick', action)
    }
  },
}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .card-row {
    width: calc(100% - 80px);
    height: 44px;
    padding: 0 40px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: $fontSizeStandart;
    color: $fontColorBlack;

    .drag-handle {
      width: 16px;
      height: 6px;
      position: absolute;
      top: calc(50% - 3px);
      left: 13px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 16px;
      background-image: url('../../../assets/icons/drag-handle-icon.svg');
      cursor: grab;
    }
    
    .not-editable-field {
      width: 150px;
      height: 23px;
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      align-items: center;
      margin-left: 30px;
    }

    &:hover {
      background-color: $hoveredItemColor;
    }

    .prospect-statuses-btns {
      width: 328px;
      margin: 0 30px;
      display: flex;
      justify-content: space-between;

      .prospect-status-btn {
        width: 20px;
        height: 20px;
        margin: 0 31px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        background-size: 20px;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url('../../../assets/icons/radio-btn-off-icon.svg');
      }

      .active-radio-btn {
        background-image: url('../../../assets/icons/radio-btn-on-icon.svg');
      }
    }

    .action-btn-container {
      width: 42px;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: auto;

      .more-actions-btn {
        border: none;
      }

      .more-actions-btn-active-state {
        border: 1px solid $grayBorderColor;
      }
    }
  }

  @media (max-width: 420px) {
    .card-row {
      width: calc(100% - 20px);
      padding: 0 10px;
      .drag-handle {
        margin-left: 20px;
      }
      .editable-field {
        .value-container {
          width: 70px;
        }
      }
    }
  }
</style>
