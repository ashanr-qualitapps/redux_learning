// Initial state
const initialState = {
  topics: [
    {
      id: 'normalization',
      title: 'Normalization of State',
      description: 'Techniques for structuring state for efficiency'
    },
    {
      id: 'reselect',
      title: 'Reselect and Memoization',
      description: 'Performance optimization with memoized selectors'
    },
    {
      id: 'redux-persist',
      title: 'Redux Persist',
      description: 'Persistently store Redux state across application sessions'
    }
  ],
  loading: false,
  error: null
};

// Action types
export const FETCH_TOPICS_REQUEST = 'FETCH_TOPICS_REQUEST';
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';
export const ADD_TOPIC = 'ADD_TOPIC';
export const REMOVE_TOPIC = 'REMOVE_TOPIC';

// Reducer
const tableTopicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TOPICS_SUCCESS:
      return {
        ...state,
        loading: false,
        topics: action.payload
      };
    case FETCH_TOPICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_TOPIC:
      return {
        ...state,
        topics: [...state.topics, action.payload]
      };
    case REMOVE_TOPIC:
      return {
        ...state,
        topics: state.topics.filter(topic => topic.id !== action.payload)
      };
    default:
      return state;
  }
};

// Selectors
export const getAllTopics = state => state.tableTopics?.topics || initialState.topics;
export const getTopicById = (state, id) => 
  getAllTopics(state).find(topic => topic.id === id);
export const getReduxPersistTopic = state => 
  getTopicById(state, 'redux-persist');
export const getLoadingStatus = state => state.tableTopics?.loading;
export const getError = state => state.tableTopics?.error;

export default tableTopicsReducer;
