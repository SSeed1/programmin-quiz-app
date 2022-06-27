import * as authApi from '../api/authApi'

export const signUp = async ({ commit }, payload) => {
  const data = await authApi.signUp(payload)
  console.log(data)
  // const { access_token, refresh_token } = tokens
  // const undoStack = []
  // const redoStack = []
  // sessionStorage.setItem('accessToken', access_token)
  // sessionStorage.setItem('refreshToken', refresh_token)
  // sessionStorage.setItem('currentUser', JSON.stringify(user))
  // sessionStorage.setItem('undoStack',JSON.stringify(undoStack))
  // sessionStorage.setItem('redoStack',JSON.stringify(redoStack))

  //commit(mutationTypes.SET_CURRENT_USER, user)
}

export const signIn = async ({ commit }, payload) => {
  const { user, tokens } = await authApi.signIn(payload)
  const { access_token, refresh_token } = tokens
  const undoStack = []
  const redoStack = []
  sessionStorage.setItem('accessToken', access_token)
  sessionStorage.setItem('refreshToken', refresh_token)
  sessionStorage.setItem('currentUser', JSON.stringify(user))
  sessionStorage.setItem('undoStack',JSON.stringify(undoStack))
  sessionStorage.setItem('redoStack', JSON.stringify(redoStack))

  //commit(mutationTypes.SET_CURRENT_USER, user)
}