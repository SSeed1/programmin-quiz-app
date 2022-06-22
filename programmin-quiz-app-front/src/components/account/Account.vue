  <template>
    <div class="success-message" v-if="successMessage">{{successMessage}}</div>
    <div class="error-message" v-if="errorMessage">{{errorMessage}}</div>
  <div class="main-wrapper">
  <div class="setting-header">
    <div class="title">Profile</div>
    <ActionButton
      v-if="!isLoadingSettings"
      :width="'151px'"
      :height="'44px'"
      :top="'50px'"
      :text="'Save'"
      :class="{'action-btn-not-active':isEnterSettingValue}"
      @click="saveSettings"
    />
    <div class="action-btn loading-indicator-container" v-if='isLoadingSettings'>
      <div class="spinner"></div>
    </div>
  </div>
  <div class="user-profile">
    <div class="common-field-container">
      <div class="common-lable">Email</div>
      <div class="common-field">{{"'vlad@mail.com'"}}</div>
    </div>
    <CommonInputField
      :width="'320px'"
      :height="'65px'"
      :inputHeight="'54px'"
      :lable="'Full Name'"
      :placeholder="'John Doel'"
      :value='newUserFullName'
      @updateValue="setNewUserName($event)"
    />
    <CommonInputField
      :width="'320px'"
      :height="'65px'"
      :inputHeight="'54px'"
      :lable="'Phone'"
      :placeholder="'+1(050)124-214-12'"
      :value='newUserPhone'
      @updateValue="setNewUserPhone($event)"
    />
  </div>
  <div class="change-password-header">
    <div class="title-password">Change Password</div>
    <ActionButton
      v-if="!isLoading"
      :width="'151px'"
      :height="'44px'"
      :top="'50px'"
      :text="'Save'"
      :class="{'action-btn-not-active':isEnterPasswordValue}"
      @click="changePassword"
    />
    <div class="action-btn loading-indicator-container" v-if='isLoading'>
      <div class="spinner"></div>
    </div>
  </div>
  <div class="password-wrapper">
    <!-- Old Password field -->
    <div class="input-container password-container">
      <div class="field-label">Old Password</div>
      <input
        :type="passwordFieldType"
        class="input-field"
        v-model="userPassword"
      >
      <div
        class="password-visibility-btn"
        :class="{
          'password-visible-icon': passwordFieldType === 'password',
          'password-invisible-icon': passwordFieldType === 'text',
        }"
        @click="switchPasswordVisibility"
      >
      </div>
    </div>
    <!-- New Password field -->
    <div class="input-container password-container">
      <div class="field-label">New Password</div>
      <input
        :type="passwordFieldType"
        class="input-field"
        v-model="newUserPassword"
      >
      <div
        class="password-visibility-btn"
        :class="{
          'password-visible-icon': passwordFieldType === 'password',
          'password-invisible-icon': passwordFieldType === 'text',
        }"
        @click="switchPasswordVisibility"
      >
      </div>
    </div>
    <!-- Reenter Password field -->
    <div class="input-container password-container">
      <div class="field-label">Confirm New Password</div>
      <input
        :type="passwordFieldType"
        class="input-field"
        v-model="reenterUserPassword"
      >
      <div
        class="password-visibility-btn"
        :class="{
          'password-visible-icon': passwordFieldType === 'password',
          'password-invisible-icon': passwordFieldType === 'text',
        }"
        @click="switchPasswordVisibility"
      >
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

import CommonInputField from '../common/CommonInputField.vue';
import ActionButton from '../common/ActionButton.vue';


export default {
  components: {
    CommonInputField,
    ActionButton,
  },
  data() {
    return {
      passwordFieldTypes: {
        PASSWORD: 'password',
        TEXT: 'text',
      },
      passwordFieldType: '',
      errorMessage: '',
      isLoadingSettings: false,
      isLoading: false,
      errorState: false,
      newUserFullName: '',
      newUserEmail: '',
      newUserPhone: '',
      userPassword: '',
      newUserPassword: '',
      reenterUserPassword: '',
      successMessage: '',
      isEnterSettingValue: false,
      isEnterPasswordValue: false,
    }
  },
  async created() {
    await this.setInitialValue()
  },
  watch: {
    successMessage(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {this.successMessage = ''},2000)
      }
    },
    errorMessage(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {this.errorMessage = ''},2000)
      }
    },
    reenterUserPassword(newValue, oldValue) {
      if(newValue) this.isEnterPasswordValue = true
      if(!newValue) this.isEnterPasswordValue = false
    }
  },
  computed: {
    ...mapState([
      'currentUser',
    ]),
  },
  methods: {
    ...mapActions([
      'updateUser',
      'updateUserLocally',
      'changeUserPassword',
    ]),
    setInitialValue() {
      this.passwordFieldType = this.passwordFieldTypes.PASSWORD
      this.newUserFullName = 'Vlad'
      this.newUserPhone = '0970240573'
    },
    async changePassword () {
      if (!this.userPassword || !this.newUserPassword || !this.reenterUserPassword) {
        this.errorMessage = 'Please enter your new password'
        return
      }
      if (this.newUserPassword !== this.reenterUserPassword) {
        this.errorMessage = 'Please reenter your new password'
        return
      }

      const passwords = {
        old_password: this.userPassword,
        new_password: this.newUserPassword,
      }
      this.isLoading = true

      try {
        this.errorMessage = ''
        await this.changeUserPassword(passwords)
        this.successMessage = 'Password has been changed'
      } catch (error) {
        this.errorMessage = 'Something went wrong! Please try again!'
      } finally {
        this.isLoading = false
        this.isEnterPasswordValue = false
      }
    },
    async saveSettings() {
      if (!this.newUserFullName ) {
        return
      }
      if (this.newUserFullName === this.currentUser.full_name && this.newUserPhone === this.currentUser.phone) {
        return
      }
      const updated_user = {
        id: this.currentUser.id,
        full_name: this.newUserFullName,
        phone: this.newUserPhone,
      }
      this.isLoadingSettings = true
      try {
        await this.updateUser(updated_user)
        this.errorMessage = ''
      } catch (error) {
        this.errorMessage = 'Something went wrong! Please try again!'
      } finally {
        this.isLoadingSettings = false
        this.isEnterSettingValue = false
      }
    },
    switchPasswordVisibility(){
      if (this.passwordFieldType === this.passwordFieldTypes.PASSWORD) {
        this.passwordFieldType = this.passwordFieldTypes.TEXT
      } else {
        this.passwordFieldType = this.passwordFieldTypes.PASSWORD
      }
    },
    setNewUserName(newUserFullName) {
      this.isEnterSettingValue = true
      this.errorMessage = ''
      this.newUserFullName = newUserFullName
    },
    setNewUserPhone(newUserPhone) {
      this.isEnterSettingValue = true
      this.errorMessage = ''
      this.newUserPhone = newUserPhone
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styleVars.scss';
  .main-wrapper {
    width: 750px;
    height: 750px;
    background-color: #e5e5e555;
    border-radius: 4px;
    margin-left: auto;
    margin-right: auto;
  }
  .error-message {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $redWarningColor;
    z-index: 999999 !important;
    position: fixed !important;
    right: 26px;
    left: 26px;
    top: 96px;
    padding: 16px;
    border-radius: 2px;
  }
  .success-message {
    display: flex;
    justify-content: center;
    align-items: center;
    color: green;
    z-index: 999999 !important;
    position: fixed !important;
    right: 26px;
    left: 26px;
    top: 96px;
    padding: 16px;
    border-radius: 2px;
  }
  .change-password-header {
    width: 90%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    margin-left: 24px;

    .action-button {
      background-color: $grayBorderColor;
      color: $fontColorBlack;
    }

    .action-btn {
      width:151px;
      height: 45px;
      margin-top:20px;
      min-height: 45px;
      display: flex;
      justify-content: center;
      background-color: $grayBorderColor;
      color: $fontColorBlack;
      cursor: pointer;
    }

    .action-btn-not-active {
      background-color: $appActionColor;
    }

    .loading-indicator-container {
      cursor: wait;

      &:hover {
        background-color: $grayBorderColor;
      }

      .spinner {
        margin-top: 10px;
        border: 5px solid $whiteColor;
        border-radius: 50%;
        border-top: 5px solid $appActionColor;
        width: 15px;
        height: 15px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    }
  }
  .setting-header {
    width: 90%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    color: $fontColorBlack;
    margin-left: 24px;

    .action-button {
      background-color:$grayBorderColor;
      color:$fontColorBlack;
    }
    .action-btn-not-active {
      background-color: $appActionColor
    }
    .action-btn {
      width:151px;
      height: 45px;
      margin-top:20px;
      min-height: 45px;
      display: flex;
      justify-content: center;
      background-color: $grayBorderColor;
      color: $fontColorBlack;
      cursor: pointer;
    }

    .loading-indicator-container {
      cursor: wait;

      &:hover {
        background-color: $grayBorderColor;
      }

      .spinner {
        margin-top: 10px;
        border: 5px solid $whiteColor;
        border-radius: 50%;
        border-top: 5px solid $appActionColor;
        width: 15px;
        height: 15px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    }

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size:$fontSizeModalTitle;
    }
  }
  .user-profile {
    width: calc(100% - 80px);
    height: 240px;
    margin-left: 24px;
    margin-top: 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    position: relative;
    margin-bottom: 12px;

    .common-input-lable {
      height: 24px;
      font-size: $fontSizeStandart;
    }
    .common-field-container {
      width: 320px;
      height: 54px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content:center;

      .common-lable {
        height: 24px;
        font-size:$fontSizeMinified;
      }
      .common-field {
        width: 100%;
        padding:4px;
        font-size:$fontSizeStandart;
      }
    }
  }
  .title-password {
    display: flex;
    justify-content: flex-start;
    align-items:center;
    font-size:$fontSizeModalTitle;
  }
  .password-wrapper {
    width: calc(100% - 80px);
    height: 250px;
    margin-left: 24px;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    .field-label {
      color:$fontColorBlack;
      font-size:$fontSizeStandart;
    }

    .input-field {
      width: 320px;
      height: 44px;
      margin-top:8px;
      padding: 0 6px;
      font-size: $fontSizeStandart;
      border: 1px solid $grayBorderColor;
      box-sizing: border-box;
      border-radius: 4px;
    }

    .input-container {
      width: 320px;
    }

    & > .input-container {
      width: 320px;
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
  }

  @media (max-width: 420px) {
    .error-message {
      margin-top: 75px;
      margin-left: 45px;
      position:fixed;
    }
    .success-message {
      margin-top: 75px;
      margin-left: 45px;
      position: fixed;
    }
    .main-contents {
      width: 365px !important;
      margin-left: 12px;
      overflow-y: scroll !important;
    }
    .user-profile {
      margin-top: 0px;
    }
    .password-wrapper {
      margin-top: 0px;
    }
  }
</style>
