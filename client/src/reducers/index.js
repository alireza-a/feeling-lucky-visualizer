import { combineReducers } from 'redux';

const data = (state = [], action) => {
  switch (action.type) {
    case 'SET_DATA':
      return action.data;
    case 'SET_TRAVEL_DURATION':
      return state.map((item, index) =>
        Object.assign({}, state, { duration: action.durations[index] })
      );
    default:
      return state;
  }
};

const activeNode = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_NODE':
      return action.node;
    default:
      return state;
  }
};

const visitedNodes = (state = [], action) => {
  switch (action.type) {
    case 'VISIT_NODE':
      return [...state, action.node];
    default:
      return state;
  }
};

const destination = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DESTINATION':
      return action.destination;
    default:
      return state;
  }
};

const visualizer = combineReducers({
  data,
  activeNode,
  visitedNodes,
  destination
});

export default visualizer;
