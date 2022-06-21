<template>
  <div class="forgot-password-wrapper">
    <div class="forgot-password-container">
      <div class="logo"></div>
      <div class="forgot-password-title">Enter your email address and password recovery link will be send to it</div>
      <div class="error-message" v-if="errorMessage">{{errorMessage}}</div>
      <CommonInputField
        :width="'100%'"
        :height="'68px'"
        :inputHeight="'44px'"
        :lable="'Email'"
        :placeholder="'Email'"
        :value="email"
        @updateValue="setEmail"
        @keyup.enter="handlePasswordRecovery"
      />
      <ActionButton
        v-if="!isLoading && !isSuccessMessageShown"
        :width="'100%'"
        :height="'54px'"
        :minHeight="'54px'"
        :text="'Send email'"
        @click="handlePasswordRecovery"
      />
      <Spinner
        v-if="isLoading"
        :width="'15px'"
        :height="'15px'"
        :containerHeight="'44px'"
      />
      <div class="success-message" v-if="isSuccessMessageShown">
        <div class="success-message-title">Success!</div>
        <div class="success-message-body">Please check your email and follow password recovery instructions</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import CommonInputField from '../../common/CommonInputField.vue' 
import ActionButton from '../../common/ActionButton.vue'
import Spinner from '../../common/Spinner.vue'

export default {
  components: {
    CommonInputField,
    ActionButton,
    Spinner,
  },
  data() {
    return {
      email: '',
      isLoading: false,
      isSuccessMessageShown: false,
      errorMessage: '',
    }
  },
  methods: {
    ...mapActions([
      'requestPasswordResetLink',
    ]),
    setEmail(email) {
      this.email = email
    },
    validateEmail() {
      const emailPattern = new RegExp(/^.+@.+\..+$/);
      return emailPattern.test(this.email);
    },
    async handlePasswordRecovery() {
      if (!this.validateEmail()) {
        this.errorMessage = 'Enter valid email'
        return
      }

      this.isLoading = true
      this.errorMessage = ''

      try {
        await this.requestPasswordResetLink({ user_email: this.email })
        this.isLoading = false
        this.isSuccessMessageShown = true

        setTimeout(() => {
          this.$router.push({ name: 'SignIn' })
        }, 3000);
      } catch (error) {
        this.isLoading = false
        this.errorMessage = 'Something went wrong, please try again'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/styleVars.scss';

  .error-message {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $redWarningColor;
  }

  .spinner-container {
    margin-top: 20px;
  }

  .success-message {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: $appActionColor;
    color: $fontColorWhite;

    & > div {
      padding: 6px;
      text-align: center
    }
  }
</style>

<style lang="scss">
  @import '../../../assets/styleVars.scss';

  .forgot-password-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .forgot-password-container {
      width: 345px;
      height: 459px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .logo {
        width: 100%;
        height: 200px;
        min-height: 200px;
        background-image: url('../../../assets/images/simple_sales_logo.png');
        background-position: center;
        background-repeat: no-repeat;
        margin-bottom: 12px;
        background-size: 100%;
      }

      .forgot-password-title {
        margin-bottom: 10px;
      }

      .common-input-lable {
        color: $fontColorGray;
      }
    }
  }
</style>