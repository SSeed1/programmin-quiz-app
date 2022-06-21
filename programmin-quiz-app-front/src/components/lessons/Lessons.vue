<template>
  <div class="header">
    <div class="logo">JavaScript Quiz-Platform</div>
    <div class="search-wrapper">
      <SearchField/>
    </div>
    <UserInfoHeaderSection
      :username="'Vladislav Tanasiuk'"
    />
  </div>
  <div class="loading-container" v-if="isLoading">
    <div class="spinner"></div>
  </div>

</template>

<script>
import SearchField from "../common/header/SearchField.vue"
import UserInfoHeaderSection from "../common/header/UserInfoHeaderSection.vue"
export default {
  components: {
    SearchField,
    UserInfoHeaderSection,
  }
}
</script>
  <style lang="scss" scoped>
  @import '../../assets/styleVars.scss';
  .body {
    background-color: #E5E5E5;
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
</style>