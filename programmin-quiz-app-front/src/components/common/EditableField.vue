<template>
  <div class="editable-field">
    <div
      v-if="currentMode === modes.VIEW && isNaN(editableValue)"
      class="value-container"
      @click="setEditMode"
    >
      {{editableValue}}
    </div>
    <div
      v-if="currentMode === modes.VIEW && !isNaN(editableValue)"
      class="value-container"
      @click="setEditMode"
    >
      {{'$'+editableValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
    </div>
    <input
      v-if="currentMode === modes.EDIT"
      class="input-field"
      :class ="{'error-input-field':errorState}"
      type="text"
      ref="inputField"
      v-model="editableValue"
      @focusout="handleInputBlur"
      @keyup.enter="handleInputBlur"
    />
  </div>
</template>

<script>

export default {
  props: ['value', 'isDisabled', 'isSubscriptionActive'],
  data() {
    return {
      pipelineRoutes:[
        'ClientsPipeline',
        'ProspectsPipeline'
      ],
      errorState: false,
      modes: {
        VIEW: 'VIEW',
        EDIT: 'EDIT',
      },
      currentMode: '',
      editableValue: '',
    }
  },
  watch: {
    currentMode(newValue, _) {
      if (newValue === this.modes.EDIT) {
        this.$nextTick(() => {
          this.$refs.inputField.focus()
        })
      }
    },
  },
  created() {
    this.currentMode = this.modes.VIEW
    this.editableValue = this.value
  },
  methods: {
    setEditMode() {
      if (!this.isSubscriptionActive) return
      if (this.isDisabled) return

      this.currentMode = this.modes.EDIT
      this.$emit('lockSwitcher')
    },
    handleInputBlur() {
      if (typeof this.editableValue === 'string') {
        this.editableValue = this.editableValue.trim()
      }

      if (this.pipelineRoutes.includes(this.$route.name)) {
        if (isNaN(this.editableValue)){
          this.editableValue = this.value
        }
      }

      if (!isNaN(this.editableValue)) {
        const regexp = /^[0-9]+$/
        const zeroRegexp = /^0+/
        if (!regexp.test(this.editableValue)) {
          this.errorState = true
          return
        }

        if (zeroRegexp.test(this.editableValue)) {
          if (this.editableValue == 0) {
            this.errorState = true
            return
          }
          this.editableValue = this.editableValue.replace(/^0+/,'')
        }
        this.errorState = false
      }

      this.currentMode = this.modes.VIEW

      if (this.editableValue && (this.editableValue !== this.value)) {
        this.$emit('valueUpdated', this.editableValue)
      }

      setTimeout(() => this.$emit('unlockSwitcher'), 500)
    },
  },
}
</script>

<style lang="scss">
  @import '../../assets/styleVars.scss';

  .editable-field {
    width: 150px;
    height: 36px;
    display: flex;
    align-items: center;
    margin-left: 30px;

    .input-field {
      width: 150px;
      height: 36px;
      padding: 3px;
      font-size: $fontSizeStandart;
      box-sizing: border-box;
      border: 1px solid $grayBorderColor;
      border-radius: 4px;
      outline: none;
    }
    .value-container {
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width:150px;
    }
    .error-input-field {
      width: 150px;
      height: 36px;
      padding: 3px;
      font-size: $fontSizeStandart;
      box-sizing: border-box;
      border: 1px solid red;
      border-radius: 4px;
      outline: none;
    }
  }
</style>
