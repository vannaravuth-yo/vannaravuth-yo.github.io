import axios from "@/plugins/axios";

export default {
  login({ commit }, user) {
    // return new Promise((resolve, reject) => {
    commit("auth_request", user);

    const data = {
      url: "login",
      grant_type: "password",
      client_id: "client-mobile",
      client_secret: "123",
      username: "admin",
      password: "123"
      // ...user
    };

    return axios({
      url: "login",
      params: data,
      method: "post"
    })
      .then(res => {
        console.log("res: ", res);
        const { access_token, token_type } = res.data;
        const token = `${token_type} ${access_token}`;
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;
        commit("auth_success", token, user);
      })
      .catch(err => {
        console.log("err: ", err);
        commit("auth_failure", err);
        localStorage.removeItem("token");
      });

    // const getAuthCredentials = oauth.client(axios, input);

    // getAuthCredentials()
    //   .then(res => {
    //     const { access_token, token_type } = res;
    //     localStorage.setItem("type", token_type);
    //     localStorage.setItem("token", access_token);
    //     axios.defaults.headers.common[
    //       "Authorization"
    //     ] = `${token_type} ${access_token}`;
    //     commit("auth_success", access_token, user);
    //     resolve(res);
    //   })
    //   .catch(err => {
    //     commit("auth_failure", err);
    //     localStorage.removeItem("type");
    //     localStorage.removeItem("token");
    //     reject(err);
    //   });
    // });
  },
  register({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit("auth_request");

      const registerUser = oauth.client(axios, { url: "register", ...user });

      // axios({
      //   url: "register",
      //   data: user,
      //   method: "POST"
      // })
      registerUser()
        .then(res => {
          const { access_token, token_type } = res;
          localStorage.setItem("type", token_type);
          localStorage.setItem("token", access_token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `${token_type} ${access_token}`;
          commit("auth_success", access_token, user);
          resolve(res);
        })
        .catch(err => {
          commit("auth_failure", err);
          localStorage.removeItem("type");
          localStorage.removeItem("token");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("logout");
      localStorage.removeItem("type");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};
