<template>
  <div class="main-cards">
    <div class="main-card-header">
      <div class="main-card-title">{{title}}</div>
    </div>
    <div class="main-card-image">
      <img src="../../../assets/logo.png" alt="">
    </div>
    <div class="main-card-button-wrapper">
      <ActionButton
        :width="'250px'"
        :height="'44px'"
        :text="'Check Info'"
        @click="showInfo(title)"
      />
      <ActionButton
        :width="'250px'"
        :height="'44px'"
        :text="'Complete Test'"
        @click="showTest(title)"
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
      
    },
    showTest(titleCard) {
      if (titleCard === 'Data Types') {
        this.$router.push({ name: 'TestDataTypes' })
      } if (titleCard === 'Interaction: alert, prompt, confirm') {
        this.$router.push({ name: 'TestInteraction' })
      } if (titleCard === 'Coding Style') {
        this.$router.push({ name: 'TestCodingStyle' })
      } if (titleCard === 'Global object') {
        this.$router.push({ name: 'TestGlobalObject'})
      } if (titleCard === 'Array Methods') {
        this.$router.push({ name: 'TestArrayMethods'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styleVars.scss';
  .main-cards {
    width: 275px;
    height: 425px;
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-direction: column;
    background: #acacac;
    margin: 12px;
    color: $fontColorBlack;
    border-radius: 7px;
    border: 1.8px solid #cfd2d3;
    box-shadow: 2px 3px 4px rgb(5, 158, 156);
    .main-card-header {
      margin-top: 5px;
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: center;
      
      .main-card-title {
        font-size: $fontSizeModalTitle;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }
    }
    .main-card-image {
      display: flex;
      width: 200px;
      height: 200px;
      border-radius:12px;
      border: 4px solid gray;
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
  .main-cards:hover {
    padding: 6px;
  }
</style>