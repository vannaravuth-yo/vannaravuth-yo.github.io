export default {
  showAlert({ commit }, message, type = "success") {
    commit("setAlertShow", true);
    commit("setAlertType", type);
    commit("setAlertMessage", message);
  },
  hideAlert({ commit }) {
    commit("setAlertShow", false);
    commit("setAlertType", "");
    commit("setAlertMessage", "");
  }
};
