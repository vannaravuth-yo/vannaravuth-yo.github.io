export default {
  getListBranches(state, payload) {
    state.branches = payload;
  },
  getListProfiles(state, payload) {
    state.profiles = payload;
  },
  getUsers(state, payload) {
    state.users = payload;
  },
  getUser(state, payload) {
    state.user = payload;
  }
};
