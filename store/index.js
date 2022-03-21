export const state = () => ({
  snackbarMsg: null,
})

export const mutations = {
  setSnackbarMsg(state, payload) {
    state.snackbarMsg = payload
  },
}
