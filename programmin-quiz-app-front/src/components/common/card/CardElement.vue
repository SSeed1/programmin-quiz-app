<template>
  <div class="main-cards">
    <div class="main-card-header">
      <div class="main-card-title">{{title}}</div>
    </div>
    <div class="main-card-image">
      <img :src="image" alt="">
    </div>
    <div class="main-card-button-wrapper">
      <ActionButton
        :width="'250px'"
        :height="'44px'"
        :text="'Check Info'"
      />
      <ActionButton
        :width="'250px'"
        :height="'44px'"
        :text="'Complete Test'"
      />
    </div>
  </div>
</template>

<script>
import ActionButton from '../../common/ActionButton.vue'
export default {
  props: ['title','image'],
  components: {
    ActionButton
  },
  methods: {
    getToInfoLessons() {

    },
    getToTests() {
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styleVars.scss';
  .main-cards {
    width: 550px;
    height: 450px;
    display: flex;
    flex-direction: column;
    background-color: #231f1f;
    margin: 12px;
    border-radius: 6px;
    .main-card-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      
      .main-card-title {
        font-size: $fontSizeModalTitle;
        color: $fontColorWhite;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }
    }
    .main-card-image {
      display: flex;
      width: 170px;
      height: 200px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 5px;
      margin-bottom: 15px;
    }
    .main-card-button-wrapper {
      display: flex;
      flex-direction:column;
      justify-content: space-between;
      margin-left: auto;
      margin-right: auto;
    }
  
  }
</style>