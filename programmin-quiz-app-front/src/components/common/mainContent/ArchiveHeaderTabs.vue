<template>
<ul class="tab-element-wrapper">
  <li class="tab-element"
  :class="{'tab-element-active-state':currentActiveTab==='Clients'}"
  @click='handleClickTab("Clients")'>
    <title>Clients</title>
  </li>
  <li class="tab-element"
  :class="{'tab-element-active-state':currentActiveTab==='Prospects'}"
  @click='handleClickTab("Prospects")'>
    <title>Prospects</title>
  </li>
</ul>
</template>

<script>
export default {
  data () {
    return {
      currentActiveTab:'Clients'
    }
  },
  methods: {
    handleClickTab(CurrentActiveTabs){
      this.currentActiveTab=CurrentActiveTabs
      this.$emit('changeActiveTab',this.currentActiveTab);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styleVars.scss';

.tab-element-wrapper {
  list-style-type: none;
  margin: 0;
  padding: 0px;
  overflow: hidden;
  background-color:white;
  cursor: pointer;
  align-items:flex-start;

  .tab-element-active-state {
    display: inline;
    float: left;
    padding: 14px 14px;
    color: #69C9A0;
    border-bottom: 4px solid #69C9A0;

    title {
      display: block;
      color: #69C9A0;
      text-decoration: none;
      text-align: center;
    }
  }

  .tab-element {
    display: inline;
    float: left;
    padding: 14px 14px;

    title {
      display: block;
      text-decoration: none;
      text-align: center;
    } 
  }
}
</style>