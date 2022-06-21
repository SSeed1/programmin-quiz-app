<template>
  <div class="search-field">
    <input
      type="text"
      class="search-input"
      placeholder="Search"
      v-model="searchValue"
      @keyup.enter="$emit('search', searchValue)"
    >
    <div v-if="activeSearch" class="close-icon" @click="cancelSearch()"></div>
    <div class="vetical-divider"></div>
    <div class="search-btn" :class="{'active-btn': activeSearch}" @click="$emit('search', searchValue)"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchValue: '',
      activeSearch: false,
    }
  },
  watch: {
    searchValue(newValue, oldValue) {
      if (newValue) {
        this.activeSearch = true
      } else if (newValue === '') {
        this.activeSearch = false
        this.$emit('cancelSearch', this.searchValue)
      }
    }
  },
  methods: {
    cancelSearch() {
      this.searchValue = ''
      this.$emit('cancelSearch', this.searchValue)
    }
  },
}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .search-field {
    width: 280px;
    height: 44px;
    display: flex;
    margin-left: 10px;
    border: 1px solid $grayBorderColor;
    border-radius: 4px;
    
    .close-icon {
      width: 20px;
      height: 100%;
      background-size: 14px;
      padding-right: 15px;
      background-position: center;
      background-repeat: no-repeat;
      cursor: pointer;
      background-color: white;
      background-image: url('../../../assets/icons/close-search-icon.svg');
    }
    .search-input {
      width: 235px;
      padding: 4px;
      border: $grayBorderColor;
      border-radius: 4px 0 0 4px;
      font-size: $fontSizeStandart;
      outline: none;
    }

    .vertical-divider {
      width: 1px;
      height: 100%;
      background-color: $grayBorderColor;
    }

    .search-btn {
      width: 44px;
      height: 100%;
      min-width: 44px;
      background-size: 24px;
      background-position: center;
      background-repeat: no-repeat;
      background-color: white;
      background-image: url('../../../assets/icons/search-icon.svg');
      cursor: pointer;
    }
    .active-btn {
      background-image: url('../../../assets/icons/active-search-btn.svg');
      background-color: #016c3c;
      border-radius: 4px
    }
  }

  @media (max-width: 420px) {
    .search-field {
      width: 135px;
      margin-right: 4px;

      .search-input {
        width: 80px;
      }
      .search-btn {
        width: 44px;
        height: 100%;
      }
    }
  }
</style>