import { set, setPagination, toggle } from "@/store/helpers/vuex";

export default {
  setLoading: set("loading"),

  setPagination: set("pagination"),
  setPage: setPagination("page"),
  setSortBy: setPagination("sortBy"),
  setDescending: setPagination("descending"),
  setTotalItems: setPagination("totalItems"),
  setTotalPages: setPagination("totalPages"),
  setRowsPerPage: setPagination("rowsPerPage"),
  setRowsPerPageItems: setPagination("rowsPerPageItems"),
  setSearch: setPagination("search"),

  setDialog: set("dialog"),
  toggleDialog: toggle("dialog"),

  setAlert: set("alert"),
  setAlertType: set("alert.type"),
  setAlertShow: set("alert.show"),
  setAlertMessage: set("alert.message"),

  closeAlert: state => {
    state["alert"] = {
      show: false,
      type: "",
      message: ""
    };
  }
};
