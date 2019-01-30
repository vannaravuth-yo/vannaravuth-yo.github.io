import axios from "@/plugins/axios";

const apiProfiles = "list/profiles";
const apiBranches = "list/branches";
const apiUser = "users";

const mapParams = (filter = {}) => {
  const { descending, page, rowsPerPage, sortBy } = filter;
  return {
    page: page || 1,
    size: rowsPerPage || 5,
    sort: descending ? "DESC" : "ASC",
    sortFieldName: sortBy || "id"
  };
};

export default {
  getListBranches({ commit }) {
    const params = {
      status: "ACTIVE",
      fieldNames: "id,description"
    };
    return axios.get(apiBranches, { params }).then(res => {
      commit("getListProfiles", res.data.data);
      return res.data.data;
    });
  },
  getListProfiles({ commit }) {
    const params = {
      status: "ACTIVE",
      fieldNames: "id,description"
    };
    return axios.get(apiProfiles, { params }).then(res => {
      commit("getListProfiles", res.data.data);
      return res.data.data;
    });
  },
  getUsers({ commit }, filter = {}) {
    return axios.get(apiUser, { params: mapParams(filter) }).then(res => {
      commit("getUsers", res.data.data);
      return res.data.data;
    });
  },
  getUser({ commit }, id) {
    return axios.get(`${apiUser}/${id}`).then(res => {
      commit("getUser", res.data);
      return res.data;
    });
  },
  saveUser({ commit }, data) {
    const { id, ...input } = data;
    if (!id) {
      return axios.post(apiUser, input).then(res => {
        commit("saveUser");
        return res.data;
      });
    }
    return axios.put(`${apiUser}/${id}`, input).then(res => {
      commit("saveUser");
      return res.data;
    });
  },
  createUser({ commit }, data) {
    return axios.post(apiUser, data).then(res => {
      commit("createUser");
      return res.data;
    });
  },
  updateUser({ commit }, id, data) {
    return axios.put(`${apiUser}/${id}`, data).then(res => {
      commit("updateUser");
      return res.data;
    });
  },
  deleteUser({ commit }, id) {
    return axios.delete(apiUser).then(res => {
      commit("deleteUser");
      return res.data;
    });
  }
};
