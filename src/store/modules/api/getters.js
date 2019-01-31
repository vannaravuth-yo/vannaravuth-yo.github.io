export default {
  status: state => state.status,
  result: state => !!state.result,
  branches: state => state.branches,
  profiles: state => state.profiles
};
