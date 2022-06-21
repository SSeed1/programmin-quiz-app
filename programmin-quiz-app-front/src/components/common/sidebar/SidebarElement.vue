<template>
  <div
    class="sidebar-element-wrapper" 
    @click="navigateToChosenOption(title)"
  >
    <div
      class="sidebar-element"
      :class="{'sidebar-element-active-state': activeOptions.includes(title)}"
    >
      <div
        class="sidebar-element-icon"
        :class="{
          'clients-active-icon': title === 'Clients' &&  currentOption === title ,
          'clients-icon': title === 'Clients' &&  !activeOptions.includes(title), 
          'prospects-active-icon': title === 'Prospects' &&  currentOption === title,
          'propsects-icon': title === 'Prospects' &&  !activeOptions.includes(title),
          'pipelines-active-icon': title === 'Pipelines' && activeOptions.includes(title),
          'pipelines-icon': title === 'Pipelines' && !activeOptions.includes(title),
          'report-active-icon': title === 'Reports' && currentOption === title,
          'report-icon': title === 'Reports' && !activeOptions.includes(title),
          'archive-active-icon': title === 'Archive' && currentOption === title,
          'archive-icon': title === 'Archive' && !activeOptions.includes(title),
        }"
      >
      </div>
      <div class="sidebar-element-title">{{title}}</div>
      <i
        class="arrow"
        :class="{
          'arrow-down': !isSublistOpened,
          'arrow-up': isSublistOpened,
        }"
        v-if="title === 'Pipelines'"
      >
      </i>
    </div>
    <div v-if="isSublistShown">
      <SublistElement
        v-for="(value, key, index) in sublistOptions"
        :key="index"
        :title="value"
        :isActive="activeOptions.includes(key)"
        @click.stop="navigateToChosenOption(key)"
      />
    </div>
  </div>
</template>

<script>
import SublistElement from './SublistElement.vue'

export default {
  props: [
    'title',
    'activeOptions',
    'appOffsetWidth',
    'sublistOptions',
  ],
  components: {
    SublistElement,
  },
  data() {
    return {
      isSublistOpened: false,
    }
  },
  computed: {
    isActiveOption() {
      
    },
    isSublistShown() {
      return this.title === 'Pipelines' && this.isSublistOpened
    },
    currentOption() {
      return this.$route.name
    },
  },
  methods: {
    switchSublistState() {
      this.isSublistOpened = !this.isSublistOpened
    },
    navigateToChosenOption(option) {
      this.$emit('setActiveOptions', option)

      if (this.appOffsetWidth <= 1024 && option !== 'Pipelines') {
        this.$emit('closeSidebar')
      }

      if (option === 'Pipelines') {
        this.switchSublistState()
        return
      }

      this.$router.push({ name: option })

    },
  },
}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .sidebar-element {
    width: 100%;
    height: 52px;
    position: relative;
    font-size: $fontSizeStandart;
    color: $fontColorSidebarGray;
    display: flex;
    align-items: center;
    border-left: 4px solid $blackColor;
    cursor: pointer;

    .sidebar-element-icon {
      width: 24px;
      height: 24px;
      margin-left: 26px;
      margin-right: 16px;
    }

    .clients-active-icon {
      background-image: url('../../../assets/icons/clients-white-icon.svg');
    }

    .clients-icon {
      background-image: url('../../../assets/icons/clients-gray-icon.svg');
    }

    .prospects-active-icon {
      background-image: url('../../../assets/icons/prospects-white-icon.svg');
    }

    .propsects-icon {
      background-image: url('../../../assets/icons/prospects-gray-icon.svg');
    }

    .pipelines-active-icon {
      background-image: url('../../../assets/icons/pipeline-white-icon.svg');
    }

    .pipelines-icon {
      background-image: url('../../../assets/icons/pipeline-gray-icon.svg');
    }

    .report-active-icon {
      background-image: url('../../../assets/icons/reports-white-icon.svg');
    }

    .report-icon {
      background-image: url('../../../assets/icons/reports-gray-icon.svg');
    }

    .archive-active-icon {
      background-image: url('../../../assets/icons/archive-white-icon.svg');
    }

    .archive-icon {
      background-image: url('../../../assets/icons/archive-gray-icon.svg');
    }

    .sidebar-element-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .arrow {
      width: 24px;
      height: 24px;
      position: absolute;
      top: calc(50% - 12px);
      right: 24px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 10px 5px;
    }

    .arrow-down {
      background-image: url('../../../assets/icons/arrow-down-icon.svg');
    }

    .arrow-up {
      background-image: url('../../../assets/icons/arrow-up-icon.svg');
    }
  }

  .sidebar-element-active-state {
    color: $fontColorWhite;
    border-left: 4px solid $appActionColor;
    background-color: $selectedBlackColor;
  }
</style>