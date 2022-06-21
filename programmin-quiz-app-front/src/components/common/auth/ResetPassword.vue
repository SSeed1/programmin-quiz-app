<template>
  <div class="reset-password-wrapper">
    <div class="reset-password-container">
      <div class="logo"></div>
      <div class="reset-password-title">Type new password</div>
      <div class="error-message" v-if="errorMessage">{{errorMessage}}</div>
      <div class="input-container password-container">
        <div class="field-label">Password</div>
        <input
          :type="passwordFieldType"
          class="input-field"
          v-model="newPassword"
          placeholder="New password"
          @keyup.enter="handlePasswordReset"
        />
        <div
          class="password-visibility-btn"
          :class="{
            'password-visible-icon': passwordFieldType === passwordFieldTypes.PASSWORD,
            'password-invisible-icon': passwordFieldType === passwordFieldTypes.TEXT,
          }"
          @click="switchPasswordVisibility"
        >
        </div>
      </div>
      <!-- Password confirmation field -->
      <div class="input-container password-container">
        <div class="field-label">Confirm password</div>
        <input
          :type="passwordFieldType"
          class="input-field"
          placeholder="Confirm new password"
          v-model="newPasswordConfirmation"
          @keyup.enter="handlePasswordReset"
        />
        <div
          class="password-visibility-btn"
          :class="{
            'password-visible-icon': passwordFieldType === passwordFieldTypes.PASSWORD,
            'password-invisible-icon': passwordFieldType === passwordFieldTypes.TEXT,
          }"
          @click="switchPasswordVisibility"
        >
        </div>
      </div>
      <ActionButton
        v-if="!isLoading && !isSuccessMessageShown"
        :width="'100%'"
        :height="'54px'"
        :minHeight="'54px'"
        :text="'Submit new password'"
        @click="handlePasswordReset"
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

import ActionButton from '../../common/ActionButton.vue'
import Spinner from '../../common/Spinner.vue'

export default {
  components: {
    ActionButton,
    Spinner,
  },
  data() {
    return {
      passwordFieldTypes: {
        PASSWORD: 'password',
        TEXT: 'text',
      },
      passwordFieldType: 'password',
      newPassword: '',
      newPasswordConfirmation: '',
      isLoading: false,
      isSuccessMessageShown: false,
      errorMessage: '',
    }
  },
  methods: {
    ...mapActions([
      'resetPassword',
    ]),
    switchPasswordVisibility() {
      if (this.passwordFieldType === this.passwordFieldTypes.PASSWORD) {
        this.passwordFieldType = this.passwordFieldTypes.TEXT
      } else {
        this.passwordFieldType = this.passwordFieldTypes.PASSWORD
      }
    },
    async handlePasswordReset() {
      if (this.newPassword.length < 8 || this.newPassword !== this.newPasswordConfirmation) {
        this.errorMessage = 'Passwords should be equal and be at least 8 characters long'
        return
      }

      this.isLoading = true
      this.errorMessage = ''

      try {
        const payload = {
          newPassword: this.newPassword,
          resetToken: this.$route.query.token,
        }

        await this.resetPassword(payload)

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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $redWarningColor;
  }
  
  .field-label {
    color: $fontColorGray;
    font-size: $fontSizeMinified;
  }

  .input-field {
    width: 100%;
    height: 44px;
    margin-top: 8px;
    padding: 0 6px;
    font-size: $fontSizeStandart;
    border: 1px solid $grayBorderColor;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .input-container {
    width: 100%;
    margin-top: 20px;
  }

  .password-container {
    position: relative;

    .password-visibility-btn {
      width: 24px;
      height: 24px;
      position: absolute;
      top: calc(100% - 34px);
      right: 12px;
      height: 24px;
      background-size: 24px;
      background-position: center;
      cursor: pointer;
    }

    .password-invisible-icon {
      background-image: url('../../../assets/icons/visibility-off-icon.svg');
    }

    .password-visible-icon {
      background-image: url('../../../assets/icons/visibility-on-icon.svg');
    }
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

  .reset-password-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .reset-password-container {
      width: 345px;
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
        margin-bottom: 12px;
        background-size: 100%;
      }

      .reset-password-title {
        margin-bottom: 10px;
      }

      .common-input-lable {
        color: $fontColorGray;
      }
    }
  }

</style>