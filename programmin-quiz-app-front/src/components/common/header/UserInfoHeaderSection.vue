<template>
  <div class="user-info-container">
    <div class="username-container" @click="openUserModal">
      <div class="username" :title="username">{{getFirstName}}</div>
      <i class="arrow-down"></i>
    </div>
    <ActionMenu
      :isActionMenuShown="isUserModalOpened"
      :width="'280px'"
      :height="'100px'"
      :top="'85px'"
      :right="'59px'"
      @closeActionMenu="closeUserModal"
    >
      <ActionMenuItem
        v-for="(action, index) in Object.values(userMenuActions)"
        :key="index"
        :text="action"
        @actionMenuItemClick="handleUserMenuClick(action)"
      />
    </ActionMenu>
    <div class="user-avatar">{{getInitials}}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ActionMenu from '../actionMenu/ActionMenu.vue'
import ActionMenuItem from '../actionMenu/ActionMenuItem.vue'

export default {
  props: ['username'],
  components: {
    ActionMenu,
    ActionMenuItem,
  },
  data() {
    return {
      isUserModalOpened: false,
      userMenuActions: {
        ACCOUNT: 'Account',
        LOGOUT: 'Logout',
      },
    }
  },
  computed: {
    getFirstName() {
      const firstName = this.username.split(' ')[0]
      return firstName
    },
    getInitials() {
      const nameElements = this.username.split(' ')

      if (nameElements.length > 1) {
        const first = nameElements[0][0]
        const last = nameElements[nameElements.length - 1][0]
        const initials = `${first.toUpperCase()}${last.toUpperCase()}`

        return initials
      }

      return nameElements[0][0]
    },
  },
  methods: {
    ...mapActions([
      'signOut',
    ]),
    openUserModal() {
      this.isUserModalOpened = true
    },
    closeUserModal() {
      this.isUserModalOpened = false
    },
    async handleUserMenuClick(action) {
      if (action === this.userMenuActions.ACCOUNT) {
        this.$router.push({ name: 'Account'})
        return
      }

      if (action === this.userMenuActions.LOGOUT) {
        //await this.signOut()
        this.$router.push({ name: 'SignIn' })
        return
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '../../../assets/styleVars.scss';

  .user-info-container {
    width: 175px;
    height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $fontSizeStandart;

    .username-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;

      .username {
        width: 45px;
        min-width: 54px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: none;
        overflow:hidden;
        white-space: nowrap;
      }

      .arrow-down {
        width: 24px;
        height: 24px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 10px 5px;
        background-image: url('../../../assets/icons/arrow-down-icon.svg');
      }
    }

    .user-avatar {
      width: 54px;
      min-width: 54px;
      height: 54px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 13px;
      border-radius: 50%;
      background-color: $avatarBackgroundColor;
      font-weight: $bolderFont;
      color: $fontColorWhite;
    }
  }
</style>
