<template>
  <div
    class="sidebar"
    :class="{
      'sidebar-opened': isOpened,
    }"
  >
    <div class="sidebar-header">
      <div
        v-if="isCloseBtnSwown"
        class="close-sidebar-btn"
        @click="$emit('closeSidebar')"
      >
      </div>
      <div class="header-row">
        <div class="sidebar-logo"></div>
        <div v-if="activePipeline.projected_value >= 0" class="title">
          $ {{activePipeline.projected_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
        </div>
      </div>
      
    </div>
    <SidebarElement
      v-for="(option, index) in options"
      :key="index"
      :title="option"
      :sublistOptions="sublistOptions"
      :activeOptions="activeOptions"
      :appOffsetWidth="appOffsetWidth"
      @setActiveOptions="handleActiveOptions"
      @closeSidebar="$emit('closeSidebar')"
    />
    <FeedbackBtn />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FeedbackBtn from '../FeedbackBtn.vue'
import SidebarElement from './SidebarElement.vue'

export default {
  props: [
    'options',
    'sublistOptions',
    'isOpened',
    'isCloseBtnSwown',
    'appOffsetWidth',
  ],
  components: {
    SidebarElement,
    FeedbackBtn,
  },
  data () {
    return {
      sublistOptionRouteNames: Object.keys(this.sublistOptions),
      activeOptions: [],
    }
  },
  created () {
    this.getActivePipeline()
    const routeName = this.$route.name
    this.handleActiveOptions(routeName)
  },
  computed: {
    ...mapState([
      'activePipeline'
    ]),
  },
  methods: {
    ...mapActions([
      'getActivePipeline'
    ]),
    handleActiveOptions(option) {
      if(this.sublistOptionRouteNames.includes(option)) {
        this.activeOptions = ['Pipelines', option]
        return 
      }

      this.activeOptions =[option]
    }
  }
}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .sidebar {
    width: 0;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 200;
    background-color: $blackColor;
    transition: all 0.2s;

    .sidebar-header {
      width: 100%;
      height: 175px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .close-sidebar-btn {
        position: absolute;
        left: 16px;
        top: 16px;
        width: 24px;
        height: 24px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 24px 24px;
        background-image: url('../../../assets/icons/close-white-icon.svg');
        cursor: pointer;
      } 
      .sidebar-logo {
        width: 190px;
        height: 95px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 190px 95px;
        background-image: url('../../../assets/images/simple_sales_logo_white.png');
      }
      .title {
        text-align: center;
        width:100%;
        height: 34px;
        padding-top: 5px;
        max-width: 220px;
        text-decoration: none; 
        text-overflow: ellipsis; 
        display: block; 
        overflow: hidden; 
        white-space: nowrap;
        background-color: #69C9A0;
        background-position: center;
        border-radius: 2px;
        margin-top: 15px;
        margin-bottom: 5px;
        font-size: $fontSizeModalTitle;
        color: $fontColorBlack;
      }
      
    }
  }

  .sidebar-opened {
    width: 240px;
  }
</style>

<style lang="scss" scoped>
  @import '../../../assets/styleVars.scss';

  .feedback-btn {
    color: $fontColorWhite;
  }
</style>