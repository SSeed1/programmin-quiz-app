import { createStore } from 'vuex'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import * as actions from './actions'

export default createStore({
  state,
  mutations,
  actions,
})

