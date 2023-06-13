const initialState = {
  isAuthenticated: false,
  user: {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    favorites: [],
  },
  favorite: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_FAVORITE':
      return {
        ...state,
        favorite: action.payload,
      };

    case 'CLEAN_FAVORITE':
      return {
        ...state,
        favorite: '',
      };
    default:
      return state;
  }
};

export default authReducer;
