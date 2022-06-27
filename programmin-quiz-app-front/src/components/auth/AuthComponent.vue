<template>
  <div class="auth-container">
    <div class="auth-content-container">
      <div class="auth-content">
        <div class="logo"></div>
        <div class="title">
          {{currentMode === modes.SIGN_IN ? 'Sign In' : 'Create Account'}}
        </div>
        <div class="current-mode-container">
          <div class="current-mode-title">
            {{currentMode === modes.SIGN_IN ? "Don't have an account?" : "Already have an account?"}}
          </div>
          <div class="switch-mode-btn" @click="switchMode">
            {{currentMode === modes.SIGN_IN ? 'Create Account' : 'Sign in'}}
          </div>
        </div>
        <div class="error-container" v-if="errorMessage">
          {{this.errorMessage}}
        </div>
        <!-- Full name field -->
        <div class="input-container" v-if="currentMode === modes.SIGN_UP">
          <div class="field-label">Full name</div>
          <input class="input-field" v-model="fullName" />
        </div>
        <!-- Email field -->
        <div class="input-container">
          <div class="field-label">Email</div>
          <input class="input-field" v-model="email" />
        </div>
        <!-- Phone field -->
        <div class="input-container" v-if="currentMode === modes.SIGN_UP">
          <div class="field-label">Phone</div>
          <input class="input-field" v-model="phone" />
        </div>
        <!-- Password field -->
        <div class="input-container password-container">
          <div class="field-label">Password</div>
          <input
            :type="passwordFieldType"
            class="input-field"
            v-model="password"
            @keyup.enter="handleAuth"
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
        <div class="input-container password-container" v-if="currentMode === modes.SIGN_UP">
          <div class="field-label">Confirm password</div>
          <input :type="passwordFieldType" class="input-field" v-model="passwordConfirmation" />
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
        <!-- Reset password -->
        <div
          class="reset-password-btn"
          v-if="currentMode === modes.SIGN_IN"
          @click="handleResetPassword"
        >
          Reset password
        </div>
        <!-- Privacy policy -->
        <div class="privacy-policy-confirmation" v-if="currentMode === modes.SIGN_UP">
          <div
            class="privacy-policy-checkbox"
            :class="{'checked-state': isPrivacyPolicyConfirmed}"
            @click="switchPrivacyPolicyConfirmation"
          >
          </div>
          <div>I agree with the privacy policy</div>
        </div>
        <!-- Proceed -->
        <ActionButton
          v-if="!isLoading"
          :width="'100%'"
          :height="'54px'"
          :minHeight="'54px'"
          :text="'Next'"
          @click="handleAuth"
        />
        <div class="action-btn loading-indicator-container" v-if="isLoading">
          <div class="spinner"></div>
        </div>
        <div class="spacer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState} from 'vuex'

import ActionButton from '../common/ActionButton.vue'

export default {
  components: {
    ActionButton,
  },
  data() {
    return {
      modes: {
        SIGN_UP: 'SIGN_UP',
        SIGN_IN: 'SIGN_IN',
      },
      passwordFieldTypes: {
        PASSWORD: 'password',
        TEXT: 'text',
      },
      currentMode: '',
      passwordFieldType: '',
      fullName: '',
      email: '',
      phone: '',
      password: '',
      passwordConfirmation: '',
      isPrivacyPolicyConfirmed: false,
      isLoading: false,
      errorMessage: '',
    }
  },
  created() {
    this.setCurrentMode(this.$route.name)
  },
  watch: {
    '$route'(to) {
      this.setCurrentMode(to.name)
    },
  },
  computed: {
    ...mapState([
      'currentUser',
    ])
  },
  methods: {
    ...mapActions([
      'signIn',
      'signUp',
    ]),
    setCurrentMode(routeName) {
      this.passwordFieldType = this.passwordFieldTypes.PASSWORD

      routeName === 'SignIn'
        ? this.currentMode = this.modes.SIGN_IN
        : this.currentMode = this.modes.SIGN_UP
    },
    switchPasswordVisibility() {
      if (this.passwordFieldType === this.passwordFieldTypes.PASSWORD) {
        this.passwordFieldType = this.passwordFieldTypes.TEXT
      } else {
        this.passwordFieldType = this.passwordFieldTypes.PASSWORD
      }
    },
    handleResetPassword() {
      this.$router.push({ 'name': 'ForgotPassword' })
    },
    switchPrivacyPolicyConfirmation() {
      this.isPrivacyPolicyConfirmed = !this.isPrivacyPolicyConfirmed
    },
    switchMode() {
      if (this.currentMode === this.modes.SIGN_IN) {
        return this.$router.push({ name: 'SignUp' })
      }

      if (this.currentMode === this.modes.SIGN_UP) {
        return this.$router.push({ name: 'SignIn' })
      }
    },
    validateEmail() {
      const emailPattern = new RegExp(/^.+@.+\..+$/);
      return emailPattern.test(this.email);
    },
    validatePassword() {
      const isLongPassword = this.password.length >= 8

      if (this.currentMode === this.modes.SIGN_IN) {
        return isLongPassword
      }

      return isLongPassword && (this.password === this.passwordConfirmation)
    },
    // validatePhone() {
    //   if (!this.phone) return true
      
    //   const phonePattern = new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,14}$/g)
    //   return phonePattern.test(this.phone)
    // },
    setErrorMessage(error) {
      if (this.currentMode === this.modes.SIGN_UP) {
        if (error.response.status === 400) {
          this.errorMessage = 'This email address has already been used. Please sign in, or select "forgot password"'
          return
        }
      }
      if (error.response.status === 400) {
        this.errorMessage = 'Email or password is not correct'
        return
      }
    },
    validateCredentials() {
      if (!this.validateEmail()) {
        this.errorMessage = 'Please enter the valid email'
        return false
      }

      if (!this.validatePassword() && (this.currentMode === this.modes.SIGN_IN)) {
        this.errorMessage = 'The passwords you entered do not match and should be at least 8 characters long. Please try again'
        return false
      }

      if (this.currentMode === this.modes.SIGN_IN) return true

      if (!this.fullName) {
        this.errorMessage = 'Full name is required'
        return false
      }

      // if (!this.validatePhone()) {
      //   this.errorMessage = 'Phone number must be valid'
      //   return false
      // }

      if (!this.validatePassword()) {
        this.errorMessage = 'The passwords you entered do not match and should be at least 8 characters long. Please try again'
        return false
      }

      if (!this.isPrivacyPolicyConfirmed) {
        this.errorMessage = 'You need to accept privacy policy to proceed'
        return false
      }

      return true
    },
    async handleSignIn() {
      this.$router.push({name:'Lessons'})
    },
    async handleSignUp() {
      const data = {
        new_user: {
          email: this.email,
          password: this.password,
          full_name: this.fullName,
          phone: this.phone,
        }
      }

      try {
        // await this.signUp(data)
        this.$router.push({ name: 'Lessons' })
      } catch (error) {
        console.log('==== error in handleSignUp: ', error);
        this.setErrorMessage(error)
      } finally {
        this.isLoading = false
      }
    },
    handleAuth() {
      const isValidCredentials = this.validateCredentials()

      if (!isValidCredentials) return

      this.isLoading = true

      if (this.currentMode === this.modes.SIGN_IN) {
        return this.handleSignIn()
      }

      if (this.currentMode === this.modes.SIGN_UP) {
        return this.handleSignUp()
      }
    }
  },
}
</script>

<style lang="scss">
  @import '../../assets/styleVars.scss';

  .auth-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

    .auth-wallpaper {
      width: 575px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-position: center;
      background-repeat: no-repeat;
      overflow: hidden;

      .wallpaper-title-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .wallpaper-title {
          width: 243px;
          height: 64px;
          font-size: 54px;
          text-align: center;
          color: $fontColorWhite;
        }

        .wallpaper-subtitle {
          width: 411px;
          height: 62px;
          margin-top: 20px;
          font-size: 22px;
          text-align: center;
          color: $fontColorWhite;
        }
      }
    }

    .auth-content-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      overflow-y: scroll;

      .auth-content {
        width: 345px;
        height: 100%;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        color: $fontColorBlack;


        .title {
          margin-top: 20px;
          font-size: $fontSizeTitle;
          font-weight: $bolderFont;
        }

        .current-mode-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: $fontSizeStandart;
          
          .switch-mode-btn {
            color: $appActionColor;
            cursor: pointer;

            &:hover {
              color: $appActionColorHovered;
            }
          }
        }

        .error-container {
          width: 100%;
          margin-top: 10px;
          color: $redWarningColor;
          font-size: $fontSizeMinified;
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
        }

        & > .input-container {
          margin-top: 30px;
        }

        & > .input-container ~ .input-container {
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
            background-image: url('../../assets/icons/visibility-off-icon.svg');
          }

          .password-visible-icon {
            background-image: url('../../assets/icons/visibility-on-icon.svg');
          }
        }

        .reset-password-btn {
          margin-top: 20px;
          color: $fontColorBlue;
          cursor: pointer;

          &:hover {
            color: $fontColorBlueHovered;
          }
        }

        .privacy-policy-confirmation {
          width: 100%;
          margin-top: 20px;
          display: flex;
          align-items: center;
          font-size: $fontSizeMinified;

          .privacy-policy-checkbox {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            border: 1px solid $grayBorderColor;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: white;
          }

          .checked-state {
            background-color: $appActionColor;
            background-size: 24px;
            background-position: center;
            background-image: url('../../assets/icons/done-icon.svg');
          }
        }

        .action-btn {
          width: 100%;
          height: 54px;
          min-height: 54px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: $appActionColor;
          color: $fontColorWhite;
          margin-top: 20px;
          cursor: pointer;

          &:hover {
            background-color: $appActionColorHovered;
          }
        }

        .loading-indicator-container {
          cursor: wait;

          &:hover {
            background-color: $appActionColor;
          }

          .spinner {
            border: 5px solid $whiteColor;
            border-radius: 50%;
            border-top: 5px solid $appActionColor;
            width: 20px;
            height: 20px;
            animation: spin 2s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        }

        .spacer {
          width: 100%;
          height: 20px;
          min-height: 20px;
        }
      }
    }
  }

  @media (max-width: 1240px) {
    .auth-container {
      justify-content: center;

      .auth-wallpaper {
        width: 0;
        visibility: hidden;
      }

      .auth-content-container {
        width: 100%;
        padding: 0 20px;
      }
    }
  }
</style>