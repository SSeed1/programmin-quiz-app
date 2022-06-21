<template>
  <div class="card-footer">
    <div class="rows-per-page-wrapper">
      <div class="rows-per-page-field" @click="openRowsPerPageDropdown">
        {{currentRowsPerPage}}
        <div
          class="open-dropdown-btn"
          :class="{'close-dropdown-btn':isRowsPerPageDropdownOpened}"
        >
        </div>
      </div>
      <ActionMenu
        :width="'56px'"
        :top="'-140px'"
        :left="'24px'"
        :height="'148px'"
        :isActionMenuShown="isRowsPerPageDropdownOpened"
        @closeActionMenu="closeRowsPerPageDropDown"
      >
        <ActionMenuItem
          v-for="rowsPerPage in RowsPerPage"
          :key="rowsPerPage"
          :text="rowsPerPage"
          @actionMenuItemClick="setNewRowsPages(rowsPerPage)"
        />
      </ActionMenu>
    </div>
    <div class="pages-info">
      <div class="current-page-number" v-if='!adminBillingPageNumberShown'>
        Page: {{currentPageNumber}} of {{totalPages}}
      </div>
      <div class="current-admin-billing-page-number" v-if='adminBillingPageNumberShown'>
        Page: {{currentPageNumber}}
      </div>
      <!-- <div class="items-count">
        {{currentItemsCount}} of {{totalItemsCount}}
      </div> -->
      <div class="pages-navigation">
        <div class="navigation-btn prev-page-btn" @click="$emit('showPrevPage')"></div>
        <div class="navigation-btn next-page-btn" @click="$emit('showNextPage')"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionMenu from '../../common/actionMenu/ActionMenu.vue'
import ActionMenuItem from '../actionMenu/ActionMenuItem.vue'
export default {
  props: ['RowsPerPage', 'currentItemsCount', 'totalItemsCount','currentPageNumber','totalPages','adminBillingPageNumberShown'],
  components: {
    ActionMenu,
    ActionMenuItem,
  },
  data() {
    return {
      currentRowsPerPage: 10,
      isRowsPerPageDropdownOpened: false
    }
  },
  methods:{
    setNewRowsPages(rowsPerPage) {
      this.currentRowsPerPage = rowsPerPage
      this.$emit('setCurrentPerPage', rowsPerPage)
    },
    openRowsPerPageDropdown() {
      this.isRowsPerPageDropdownOpened = true
    },
    closeRowsPerPageDropDown() {
      this.isRowsPerPageDropdownOpened = false
    }
  }
}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .page-item {
    height: 24px !important;
    background-color:black;
  }
  .card-footer {
    width: calc(100% - 80px);
    height: 57px;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $fontSizeMinified;
    color: $fontColorGray;

    .rows-per-page-wrapper {
      width: 50px;
      height: 44px;
      position: relative;

      .rows-page-item {
        height: 24px !important;
      }

      .rows-per-page-field {
          background-color: white;
          width: 54px;
          height: 24px;
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
            top:2px;
            right:-2px;
            position:absolute;
            background-position: center;
            background-size: 20px;
            background-repeat: no-repeat;
            background-image: url('../../../assets/icons/chevron-down-gray-icon.svg')
          }
          .close-dropdown-btn {
            background-image: url('../../../assets/icons/chevron-up-gray-icon.svg')
          }
      }
    }

    .pages-info {
      display:  flex;
      align-items: center;

      .pages-navigation {
        width: 50px;
        margin-left: 20px;
        display: flex;
        justify-content: space-between;

        .navigation-btn {
          width: 18px;
          min-width: 18px;
          height: 15px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 18px 15px;
          cursor: pointer;
        }

        .prev-page-btn {
          background-image: url('../../../assets/icons/chevron-left-icon.svg');
        }

        .next-page-btn {
          background-image: url('../../../assets/icons/chevron-right-icon.svg');
        }
      }
    }
  }

  @media (max-width: 420px) {
    .card-footer {
      width: calc(100% - 20px);
    }
  }

</style>
