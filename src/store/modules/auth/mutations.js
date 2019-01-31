export default {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token) {
    state.status = "success";
    state.token = token;
  },
  auth_failure(state) {
    state.status = "failure";
  },
  logout(state) {
    state.status = "logout";
    state.token = "";
  }
};
