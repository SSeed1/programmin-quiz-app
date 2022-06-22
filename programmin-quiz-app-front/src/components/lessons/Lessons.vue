<template>
  <div class="header">
    <div class="logo">JavaScript Quiz-Platform</div>
    <div class="search-wrapper">
      <SearchField
        @search ="handleSearch($event)"
        @cancelSearch="cancelSearch($event)"
      />
    </div>
    <UserInfoHeaderSection
      :username="'Vladislav Tanasiuk'"
    />
  </div>
  <div class="loading-container" v-if="isLoading">
    <div class="spinner"></div>
  </div>
  <div class="main-wrapper-lessons">
    <Spinner v-if="!forSale" />
    <CardElement
      v-for="element in forSale" 
      :key="element.invId"
      :title="element.name"
      
    />
  </div>
</template>

<script>
import SearchField from "../common/header/SearchField.vue"
import CardElement from '../common/card/CardElement.vue'
import UserInfoHeaderSection from "../common/header/UserInfoHeaderSection.vue"
import Spinner from "../common/Spinner.vue"
export default {
  components: {
    SearchField,
    UserInfoHeaderSection,
    CardElement,
    Spinner,
  },
  data() {
    return {
      forSale: [
      { invId: 1, name: 'Data Types', image: '../../../assets/lessons_images/js_data_types.png',},
      { invId: 2, name: 'Interaction: alert, prompt, confirm', image: '../../../assets/lessons_images/js_data_types.png',},
      { invId: 3, name: 'Coding Style', image: '../../../assets/lessons_images/js_data_types.png',},
      { invId: 4, name: 'Global object', image: '../../../assets/lessons_images/js_data_types.png',},
      { invId: 5, name: 'Array methods', image: '../../../assets/lessons_images/js_data_types.png',},
    ],
    }
  },
  methods: {
    handleSearch(searchValue) {
      let findLessons = this.forSale.find(city => city.name === searchValue)
      this.forSale = findLessons
    },
    cancelSearch(searchValue) {
      document.location.reload();
    }
  }
}
</script>
  <style lang="scss" scoped>
  @import '../../assets/styleVars.scss';
  .body {
    background-color: #E5E5E5;
    overflow: scroll;
  }
  .header {
    width: 100%;
    height: 64px;
    color: white;
    background-color: #439f87;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    
    .search-wrapper {
      margin-top: 15px;
      width: 250px;
      height: 64px;
    }
  }
  .main-wrapper-lessons  {
    display: flex;
    height: 100%;
    flex-direction: row;
    margin: 12px;
    flex-wrap: wrap;
    overflow: scroll;
  }
</style>