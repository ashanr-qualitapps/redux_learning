import { combineReducers } from 'redux';

const initialState = {
  loading: false,
  error: null,
  data: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer
});

export default rootReducer;
