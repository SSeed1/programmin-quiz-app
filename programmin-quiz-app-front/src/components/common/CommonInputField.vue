<template>
  <div
    class="common-input-field-container"
    :style="{
      width: width,
      height: height,
    }"
  >
    <div class="common-input-lable" v-if="lable">{{lable}}</div>
    <input
      class="common-input-field"
      :style="{
        height: inputHeight,
      }"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: [
    'width',
    'height',
    'inputHeight',
    'lable',
    'placeholder',
    'value',
  ],
  methods: {
    handleInput(value) {
      const trimmedValue = value.trim()
      this.$emit('updateValue', trimmedValue)
    },
  },
}
</script>

<style lang="scss">
  @import '../../assets/styleVars.scss';

  .common-input-field-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .common-input-lable {
      height: 24px;
      font-size: $fontSizeMinified;
    }

    .common-input-field {
      width: 100%;
      padding: 4px;
      border: 1px solid $grayBorderColor;
      border-radius: 4px;
      font-size: $fontSizeStandart;
      outline: none;
      box-sizing: border-box;
    }
  }
</style>