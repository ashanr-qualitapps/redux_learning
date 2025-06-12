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
    },
    {
      id: 'architecture-patterns',
      title: 'Redux Architecture Patterns',
      description: 'Effective ways to organize and structure your Redux codebase for better maintainability',
      category: 'advanced',
      date: '2025-06-03'
    },
    // New React-Redux integration topics
    {
      id: 'context-vs-redux',
      title: 'React Context vs Redux',
      description: 'When to use React Context API versus Redux for state management',
      category: 'react-integration',
      date: '2025-06-10'
    },
    {
      id: 'react-redux-performance',
      title: 'React-Redux Performance',
      description: 'Performance optimization techniques for React components with Redux',
      category: 'react-integration',
      date: '2025-06-12'
    },
    {
      id: 'custom-redux-hooks',
      title: 'Custom Redux Hooks',
      description: 'Creating reusable custom hooks that encapsulate Redux logic',
      category: 'react-integration',
      date: '2025-06-15'
    },
    {
      id: 'redux-router-integration',
      title: 'Redux and React Router',
      description: 'Best practices for connecting Redux state to routing in React applications',
      category: 'react-integration',
      date: '2025-06-18'
    },
    {
      id: 'redux-suspense',
      title: 'Redux with React Suspense',
      description: 'Integrating Redux with React Suspense for improved user experience',
      category: 'advanced-react',
      date: '2025-06-20'
    }
  ],
  loading: false,
  error: null,
  selectedTopic: null
};

// Action types
export const FETCH_TOPICS_REQUEST = 'FETCH_TOPICS_REQUEST';
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';
export const ADD_TOPIC = 'ADD_TOPIC';
export const REMOVE_TOPIC = 'REMOVE_TOPIC';

// Reducer
export const tableTopicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_TOPIC':
      return {
        ...state,
        selectedTopic: action.payload
      };
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
