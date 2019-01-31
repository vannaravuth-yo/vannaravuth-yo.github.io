export default {
  status: state => state.status,
  isLoggedIn: state => !!state.token
};
