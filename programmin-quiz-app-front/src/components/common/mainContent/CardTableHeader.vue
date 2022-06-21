<template>
  <div class="card-table-header">
    <CustomCheckbox
      v-if="isCheckboxShown"
      :isCheckboxChecked="isCheckboxChecked"
      @click="handleCheckboxClick"
    />
    <div
      class="table-header-field editable-field-title"
      :class="{ 'active-state': order.includes('name') }"
      @click="handleOrderChange('name')"
    >
      Name
      <div class="sorting-arrows" v-if="!isNameSortArrowHiddent">
        <div class="arrow-up" :class="{ 'active-arrow-up': order === '-name' }"></div>
        <div class="arrow-down" :class="{ 'active-arrow-down': order === 'name' }"></div>
      </div>
    </div>
    <div
      v-if="isCompanyShown"
      class="table-header-field editable-field-title"
      :class="{ 'active-state': order.includes('company') }"
      @click="handleOrderChange('company')"
    >
      Company
      <div class="sorting-arrows" v-if="!isCompanySortArrowHiddent">
        <div class="arrow-up" :class="{ 'active-arrow-up': order === '-company' }"></div>
        <div class="arrow-down" :class="{ 'active-arrow-down': order === 'company' }"></div>
      </div>
    </div>
    <div
      v-if="isValueShown"
      class="table-header-field editable-field-title"
      :class="{ 'active-state': order.includes('value') }"
      @click="handleOrderChange('value')"
    >
      Value
      <div class="sorting-arrows" v-if="!isValueSortArrowHiddent">
        <div class="arrow-up" :class="{ 'active-arrow-up': order === '-value' }"></div>
        <div class="arrow-down" :class="{ 'active-arrow-down': order === 'value' }"></div>
      </div>
    </div>
    <div
      v-if="isDealsStatusShown"
      class="table-header-field editable-field-title"
      :class="{ 'active-state': order.includes('is_closed') }"
      @click="handleOrderChange('is_closed')"
    >
      Closed Deal
      <div class="sorting-arrows">
        <div class="arrow-up" :class="{ 'active-arrow-up': order === '-is_closed' }"></div>
        <div class="arrow-down" :class="{ 'active-arrow-down': order === 'is_closed' }"></div>
      </div>
    </div>
    <div v-if="isClosedDateShown" class="table-header-field editable-field-title">
      Closed Date
    </div>
    <div v-if="prospectStatuses" class="prospect-status-headers">
      <div
        class="prospect-status-header"
        :class="{
          'active-state': order.includes(`status_${value}`),
          'common-cursor': value === 0,
        }"
        v-for="(value, key) in prospectStatuses"
        @click="handleOrderChange(`status_${value}`)"
        :key="key"
      >
        <div>{{ key }}</div>
        <div class="sorting-arrows" v-if="value !== 0">
          <div class="arrow-up" :class="{ 'active-arrow-up': order === `-status_${value}` }"></div>
          <div class="arrow-down" :class="{ 'active-arrow-down': order === `status_${value}` }"></div>
        </div>
      </div>
    </div>
    <div v-if="isExpirationDateShown" class="table-header-field editable-field-title">
      Expiration Date
    </div>
    <div v-if="isMembersStatusShown" class="table-header-field editable-field-title">
      Status
    </div>
    <div v-if="isBillingDateShown" class="table-header-field editable-field-title">
      Date
    </div>
    <div v-if="isBillingAmountShown" class="table-header-field editable-field-title">
      Amount
    </div>
    <div v-if="!isActionHeaderHiddent" class="table-header-field actions-header-field">Action</div>
  </div>
</template>

<script>
import CustomCheckbox from "../CustomCheckbox.vue";

export default {
  props: [
    "isCheckboxShown",
    "isExpirationDateShown",
    "isCompanyShown",
    "isMembersStatusShown",
    "isBillingDateShown",
    "isValueShown",
    "isBillingAmountShown",
    "isDealsStatusShown",
    "selectedRows",
    "prospectStatuses",
    "isClosedDateShown",
    "isNameSortArrowHiddent",
    "isCompanySortArrowHiddent",
    "isValueSortArrowHiddent",
    "isActionHeaderHiddent",
    'isSelectAllCheckbox',
    'order',
  ],
  components: {
    CustomCheckbox,
  },
  data() {
    return {
      isCheckboxChecked: false,
    };
  },
  watch: {
    isSelectAllCheckbox(newValue, _) {
      if (newValue === false) {
        this.isCheckboxChecked = false;
      } else if (newValue === true) {
        this.isCheckboxChecked = true;
      }
    },
    selectedRows(newValue, _) {
      if (!newValue || !newValue.length) this.isCheckboxChecked = false;
    },
  },
  methods: {
    handleCheckboxClick() {
      if (this.isCheckboxChecked) {
        this.isCheckboxChecked = false;
        this.$emit("removeSelection");
      } else {
        this.isCheckboxChecked = true;
        this.$emit("checkboxSelect");
      }
    },
    handleOrderChange(newOrder) {
      if (newOrder === 'status_0') return

      if (this.order.includes('status_') && this.order === newOrder) {
        this.$emit('setOrder', '')
        return
      }

      if (this.order === newOrder) this.$emit('setOrder', `-${newOrder}`)
      else if (this.order === `-${newOrder}`) this.$emit('setOrder', '')
      else this.$emit('setOrder', newOrder)
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/styleVars.scss";

.card-table-header {
  width: calc(100% - 80px);
  height: 47px;
  display: flex;
  align-items: center;
  font-size: $fontSizeMinified;
  color: $fontColorGray;

  .table-header-field {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 30px;
    cursor: pointer;
  }

  .editable-field-title {
    width: 150px;
  }

  .prospect-status-headers {
    width: 328px;
    margin: 0 30px;
    display: flex;
    justify-content: space-between;

    .prospect-status-header {
      width: 42px;
      margin: 0 20px !important;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .common-cursor {
      cursor: default;
    }
  }

  .active-state {
    color: $appActionColor;
  }

  .actions-header-field {
    width: 42px;
    justify-content: center;
  }

  div:last-of-type {
    margin-left: auto;
  }
}

@media (max-width: 420px) {
  .card-table-header {
    width: calc(100% - 80px);
  }
}

.sorting-arrows {
  width: 10px;
  height: 20px;
  margin-left: 10px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .arrow-up {
    width: 10px;
    height: 10px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 10px 10px;
    background-image: url("../../../assets/icons/sorting-arrow-up-icon.svg");
  }

  .arrow-down {
    width: 10px;
    height: 10px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 10px 10px;
    background-image: url("../../../assets/icons/sorting-arrow-down-icon.svg");
  }

  .active-arrow-up {
    background-image: url("../../../assets/icons/sorting-arrow-up-active-icon.svg");
  }

  .active-arrow-down {
    background-image: url("../../../assets/icons/sorting-arrow-down-active-icon.svg");
  }
}
</style>
