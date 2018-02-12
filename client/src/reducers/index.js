import { SET_DATA, SELECT_NODE, VISIT_NODE } from '../actions';

const rootReducer = (
  state = {
    data: [],
    activeNode: null,
    visitedNodes: [],
    destination: null,
    isFecthing: false,
    fetched: false,
    error: null
  },
  action
) => {
  switch (action.type) {
    case SET_DATA:
      const data = action.data;
      return Object.assign({}, state, {
        data: data.data,
        activeNode: data.data[0],
        destination: data.destination,
        visitedNodes: [],
        isFecthing: false,
        fetched: true,
        error: null
      });
    case SELECT_NODE:
      return Object.assign({}, state, {
        activeNode: action.node
      });
    case VISIT_NODE:
      return Object.assign({}, state, {
        visitedNodes: [...state.visitedNodes, action.node]
      });
    default:
      return state;
  }
};

export default rootReducer;
