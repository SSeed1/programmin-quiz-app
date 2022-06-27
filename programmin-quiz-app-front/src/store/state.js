export default {
  currentUser: null,
  clients: {
    clientsList: [],
    clientsCount: 0,
  },
  prospects: {
    prospectsList: [],
    prospectsCount: 0,
  },
  activePipeline: {},
  clientDeals: {
    clientDealsList: [],
    clientDealsCount: 0,
  },
  hotDeals: {
    hotDealsList: [],
    hotDealsCount: 0,
  },
  inProgressDeals: {
    inProgressDealsList: [],
    inProgressDealsCount: 0,
  },
  targetDeals: {
    targetDealsList: [],
    targetDealsCount: 0,
  },
  archive: {
    archivedClientsList: [],
    archivedClientsCount: 0,
    archivedProspectsList: [],
    archivedProspectsCount: 0,
  },
  completedSales: {
    completedSalesList: [],
    completedSalesCount: 0,
  },
  pipelines :{
    pipelinesList: {},
    pipelinesCount: 0,
  },
  users: {
    membersList: [],
    membersCount: 0,
  },
  billingAdminHistory: {
    billingList: [],
    billingCount: 0,
  },
  cardsList: [],
  isUndoStack: false,
  isRedoStack: false,
}
