import Vue from "vue";
import Axios from "axios";

const baseURL = "http://159.65.9.188:8281/api/";

const axios = Axios.create({
  baseURL,
  withCredentials: false
});

Vue.prototype.$http = axios;

export default axios;
