<template>
  <div class="pipeline-goal-field">
    <div
      v-if="currentMode === modes.VIEW"
      class="value-container"
      @click="setEditMode"
    >
      {{editableValue}}
    </div>
    <input
      v-if="currentMode === modes.EDIT"
      class="input-field"
      type="text"
      ref="inputField"
      :placeholder="placeholder"
      v-model="editableValue"
      @focusout="handleInputBlur"
    />
  </div>
</template>

<script>

export default {
  props: [
    'placeholder',
    'value',
    'isSubscriptionActive',
    ],
  data() {
    return {
      modes: {
        VIEW: 'VIEW',
        EDIT: 'EDIT',
      },
      currentMode: '',
      editableValue: '',
    }
  },
  created() {
    this.currentMode = !this.value ? this.modes.EDIT : this.modes.VIEW
    this.editableValue = this.value || ''
  },
  watch:{
    value(newValue, oldValue) {
      if (newValue) {
        this.editableValue = newValue
        this.currentMode = this.modes.VIEW
      }
    },
  },
  methods: {
    setEditMode() {
      if (!this.isSubscriptionActive) return
      this.currentMode = this.modes.EDIT
    },
    handleInputBlur() {
      if (!this.isSubscriptionActive) {
        this.editableValue = this.value || ''
        return
      }

      this.editableValue = this.editableValue.trim()
      
      if (this.editableValue) {
        this.currentMode =  this.modes.VIEW
      }

      if (this.editableValue !== this.value) {
        this.$emit('pipelineGoalUpdated', this.editableValue)
      } else {
        this.editableValue = this.value
        this.currentMode = this.modes.EDIT
      }
    },
  },
}
</script>

<style lang="scss">
  @import '../../../assets/styleVars.scss';
  
  .pipeline-goal-field {
    width: 150px;
    height: 46px;
    display: flex;
    align-items: center;
    margin-left: 10px;
    outline: none;

    .input-field {
      width: 150px;
      height: 46px;
      padding: 3px;
      font-size: $fontSizeStandart;
      box-sizing: border-box;
      border: 1px solid $grayBorderColor;
      border-radius: 4px;
      outline: none;
    }
  }
</style>