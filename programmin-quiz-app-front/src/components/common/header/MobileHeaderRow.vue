<template>
  <div class="header-row">
    <div class="sidebar-btn" @click="$emit('openSidebar')"></div>
    <UserInfoHeaderSection :username="currentUser.full_name"/>
  </div>
  <div class="header-row">
    <div class="title-section">
      <div class="title-container">
        <div class="title" v-if="activePipeline.projected_value >= 0">
          Pipelines Value {{'$' + activePipeline.projected_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
        </div>
        <div class="current-date">{{getPipelineDate()}}</div>
      </div>
    </div>
    <div class="vertical-divider"></div>
    <div class="closed-value-container" v-if="activePipeline.projected_value >= 0">
      Closed Value {{'$'+activePipeline.closed_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
    </div>
  </div>
  <div class="header-row">
    <div class="left-side-actions">
      <UndoRedoBtns
          :isUndoStackActive="isUndoStackActive"
          :isRedoStackActive="isRedoStackActive"
          @undo="Undo()"
          @redo="Redo()"
      />
      <MoreActionsBtn
        :width="'44px'"
        :height="'46px'"
        :isActive="isActionMenuShown"
        @click="openHeaderActionMenu"
      />
      <ReportsButton
        :width="'44px'"
        :height="'46px'"
        @click="getReportsForActivePipeline"
      />
      <ActionMenu
        :width="'280px'"
        :height="'98px'"
        :top="'50px'"
        :left="'100px'"
        :isActionMenuShown="isActionMenuShown"
        @closeActionMenu="closeHeaderActionMenu"
      >
        <ActionMenuItem
          v-for="(action, index) in Object.values(menuActions)"
          :key="index"
          :text='action'
          @actionMenuItemClick="handleActionMenuClick"
        />
      </ActionMenu>
    </div>
    <ActionButton
      :width="'200px'"
      :height="'46px'"
      :text="'+ Add new client'"
      @click="showModal"
    />
    <ClientsActionModal
      :isModalShown="isModalShown"
      :isModalLoading="isModalLoading"
      :modalError="modalError"
      :newClientName="newClientName"
      :newClientCompany="newClientCompany"
      @hideModal="hideModal"
      @setNewClientName="setClientName"
      @setNewClientCompany="setClientCompany"
      @createClient="handleCreateClientAndDeal"
    />
  </div>
  <div class="header-row">
    <div class="goal-values">
      <PipelineGoalField
        :value="activePipeline.goal_one"
        :placeholder="'Goal One'"
        :isSubscriptionActive="isSubscriptionActive"
        @pipelineGoalUpdated="handlePipelineGoalsUpdate({ goal_one: $event })"
      />
      <PipelineGoalField
        :value="activePipeline.goal_two"
        :placeholder="'Goal Two'"
        :isSubscriptionActive="isSubscriptionActive"
        @pipelineGoalUpdated="handlePipelineGoalsUpdate({ goal_two: $event })"
      />
      <PipelineGoalField
        :value="activePipeline.goal_three"
        :placeholder="'Goal Three'"
        :isSubscriptionActive="isSubscriptionActive"
        @pipelineGoalUpdated="handlePipelineGoalsUpdate({ goal_three: $event})"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import UserInfoHeaderSection from  '../../../components/common/header/UserInfoHeaderSection.vue'
import UndoRedoBtns from '../../common/header/UndoRedoBtns.vue'
import ActionButton from '../../common/ActionButton.vue'
import ActionMenu from '../../common/actionMenu/ActionMenu.vue'
import ActionMenuItem from '../../common/actionMenu/ActionMenuItem.vue'
import ClientsActionModal from '../../common/ClientsActionModal.vue'
import PipelineGoalField from '../../common/mainContent/PipelineGoalField.vue'
import MoreActionsBtn from '../../common/MoreActionsBtn.vue'
import ReportsButton from '../../common/ReportsButton.vue'
import { getPipelineDate } from '../../../utils/helpers'
import { DealType } from '../../../utils/constants'

export default {
  props: [
    'selectedRows',
    'isSubscriptionActive',
    'selectedSubject'
  ],
  components: {
    UserInfoHeaderSection,
    UndoRedoBtns,
    ActionButton,
    ActionMenu,
    ActionMenuItem,
    ClientsActionModal,
    PipelineGoalField,
    MoreActionsBtn,
    ReportsButton,
  },
  data () {
    return {
      isLoading:false,
      isActionMenuShown: false,
      isModalShown: false,
      isModalLoading: false,
      modalError: '',
      newClientName: '',
      newClientCompany: '',
      dealsType: DealType,
      menuActions: {
        REMOVE_FROM_PIPELINE: 'Remove from Pipeline',
        MOVE_TO_PROSPECT_PIPELINE: 'Move to Prospects Pipeline',
      }
      
    }
  },
  computed: {
    ...mapState([
      'currentUser',
      'activePipeline',
      'clientDeals',
      'isUndoStack',
      'isRedoStack',
    ]),
    isUndoStackActive(){
      return this.isUndoStack
    },
    isRedoStackActive(){
      return this.isRedoStack
    },
    currentPage() {
      const start = this.currentPageNumber === 1
        ? 0
        : this.currentPageNumber*this.pageSize - this.pageSize

      const stop = this.currentPageNumber === 1
        ? this.pageSize
        : this.currentPageNumber * this.pageSize

      const page = this.clientDealsList.slice(start, stop)

      return page
    },
  },
  methods: {
    ...mapActions([
      'updatePipelineGoals',
      'createClientAndDeal',
      'removeClientDeals',
      'clearClients',
      'getMonthReportHtml',
      'moveClientsPipelineToProspects',
    ]),
    getPipelineDate,
    handleGeneralError(error) {
      console.log('==== error while obtaining pipeline info: ', error);
      this.errorMessage = 'Something went wrong, please try again'
    },
    openHeaderActionMenu() {
      if (!this.isSubscriptionActive) return
      this.isActionMenuShown = true
    },
    getReportsForActivePipeline() {
      this.getMonthReportHtml(this.activePipeline.id)
    },
    async Undo() {
      this.currentPageNumber = 1
      await this.handelUndoRedoClick('undoStack')
      await this.clearClients()
      await this.getFirstPage()
    },
    async Redo() {
      this.currentPageNumber = 1
      await this.handelUndoRedoClick('redoStack')
      await this.clearClients()
      await this.getFirstPage()
    },
    hideModal() {
      this.isModalShown = false
    },
    showModal() {
      if (!this.isSubscriptionActive) return
      this.isModalShown = true
    },
    setClientName(newClientName) {
      this.newClientName = newClientName
    },
    setClientCompany(newClientCompany) {
      this.newClientCompany = newClientCompany
    },
    closeHeaderActionMenu() {
      this.isActionMenuShown = false
    },
    async handleActionMenuClick(action, dealId=null,subjectId=null) {
      this.isActionMenuShown = false
      this.isLoading = true


      const dealIds = dealId ? [dealId] : this.selectedRows
      const subjectIds = subjectId ? [subjectId] : this.selectedSubject
      
      if (!dealIds.length && !subjectIds.length) {
        this.isLoading = false
        return
      }
      const payload = {
          pageSize: this.pageSize,
          lastId: this.lastId,
          dealsType: this.dealsType.ClientDeal,
      }

      if (action === this.menuActions.REMOVE_FROM_PIPELINE) {
        try {
          await this.removeClientDeals(dealIds)
          if (this.currentPage.length == 0) {
            this.getPrevPage()
          }
          if (this.clientDeals.clientDealsList.length <= 10 && this.clientDeals.clientDealsList.length <= this.totalItemsCount ) {
            await this.getNextClientDealsPage(payload)
          }
          this.removeRowsSelection()
        } catch (error) {
          this.handleGeneralError(error)
        } finally {
          this.isLoading = false
        }
      }

      if (action === this.menuActions.MOVE_TO_PROSPECT_PIPELINE) {
        const payloads = { 
          dealIds: dealIds,
          subjectIds: subjectIds,
        }

        const payload = {
            pageSize: this.pageSize,
            lastId: this.lastId,
            dealsType: this.dealsType.ClientDeal,
        }

        try {
          await this.moveClientsPipelineToProspects(payloads)
          if (this.currentPage.length == 0) {
            this.getPrevPage()
          }
          if (this.clientDeals.clientDealsList.length <= 10 && this.clientDeals.clientDealsList.length <= this.totalItemsCount) {
            await this.getNextClientDealsPage(payload)
          }
          this.removeRowsSelection()
        } catch (error) {
          this.handleGeneralError(error)
        } finally {
          this.isLoading = false
        }
      }
    },
    async handleCreateClientAndDeal() {
      if(!this.newClientName || !this.newClientCompany) {
        this.modalError = 'Client name and company are required'
        return
      }

      const payload = {
        new_client : {
          name: this.newClientName,
          company: this.newClientCompany,
        },
      }

      try {
        this.isModalLoading = true
        await this.createClientAndDeal(payload)
        this.isModalShown = false;
      } catch (error) {
        console.log('==== error while creating deals: ', error);
        this.modalError = 'Something went wrong, please try again...'
      } finally {
        this.newClientName = ''
        this.newClientCompany = ''
        this.isModalLoading = false
      }
    },
    async handlePipelineGoalsUpdate(goalUpdate) {
      const goals = {
        goal_one: this.activePipeline.goal_one,
        goal_two: this.activePipeline.goal_two,
        goal_three: this.activePipeline.goal_three,
      }
      const payload = { ...goals, ...goalUpdate}

      await this.updatePipelineGoals(payload)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/styleVars.scss';

.header-row {
  width: 95%;
  margin:5px;
  display: flex;
  flex-direction: row !important;
  justify-content: space-between;
  align-items: center;
  color: $fontColorBlack;

  .action-button {
    margin-top: 0;
  }

  .goal-values {
    display: flex;
    flex-direction: row !important;
    width: 60%;

    .pipeline-goal-field {
      width: 144px !important;
      margin-left: 5px;
    }
    .pipeline-goal-field:deep(.input-field){
      width: 120px !important;
    }
  }

  .sidebar-btn {
    position: relative;
    width: 24px;
    height: 24px;
    margin-right: 15px;
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url('../../../assets/icons/hamburger-icon.svg');
  }

  .vertical-divider {
    width: 1px;
    height: 73px;
    margin-right: 15px;
    background-color: #c9cde8;
  }

  .title-section {
    display: flex;
    justify-content: center;
    align-items: center;

    .title-container {
      display: flex;
      flex-direction: column;

      .title {
        font-size: $fontSizeTitle;
      }

      .current-date {
        font-size: $fontSizeMinified;
        color: $fontColorGray;
      }
    }

    .closed-value-container {
      margin-left: 20px;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
    }
  }

  .left-side-actions {
    width: 50%;
    position: relative;
    display: flex;
    margin-right: 10px;
  }

  .modal-header {
    width: calc(100% - 80px);
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .modal-title {
      font-size: $fontSizeModalTitle;
    }

    .close-modal-btn {
      width: 24px;
      height: 24px;
      background-size: 14px;
      background-repeat: no-repeat;
      background-image: url('../../../assets/icons/close-icon.svg');
      cursor: pointer;
    }
  }

  .modal-error {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: $redWarningColor;
    font-size: $fontSizeMinified;
  }
  .modal-content {
    width: calc(100% - 180px);
    height: 158px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    margin-bottom: 30px;
  }
  .modal-content:deep(.action-button) {
    width: 104px !important;
  }
}

</style>
