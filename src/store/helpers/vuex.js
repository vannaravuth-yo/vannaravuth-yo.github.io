/* eslint-disable no-console */

import _ from "lodash";

export const set = property => (state, payload) => {
  _.set(state, property, payload);
};

export const toggle = property => state => {
  state[property] = !state[property];
};

export const setPagination = property => (state, payload) =>
  (state.pagination[property] = payload);
