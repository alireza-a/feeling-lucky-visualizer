export const SET_DATA = 'SET_DATA';
export const SELECT_NODE = 'SELECT_NODE';
export const VISIT_NODE = 'VISIT_NODE';

export const setData = data => ({
  type: SET_DATA,
  data
});

export const selectNode = node => ({
  type: SELECT_NODE,
  node
});

export const visitNode = node => ({
  type: VISIT_NODE,
  node
});
