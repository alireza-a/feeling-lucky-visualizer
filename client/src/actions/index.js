export const setData = data => ({
  type: 'SET_DATA',
  data
});

export const selectNode = node => ({
  type: 'SELECT_NODE',
  node
});

export const visitNode = node => ({
  type: 'VISIT_NODE',
  node
});

export const clearVisitedNodes = () => ({
  type: 'CLEARE_VISITED_NODES'
});

export const setDestination = destination => ({
  type: 'SET_DESTINATION',
  destination
});
