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

export const setDestination = destination => ({
  type: 'SET_DESTINATION',
  destination
});

export const setTravelDuration = durations => ({
  type: 'SET_TRAVEL_DURATION',
  durations
});
