const AUTH = 'auth/AUTH';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';

const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

const EMPTYSTATU = 'auth/EMPTYSTATU';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        auth: action.data
      };
    case LOGIN:
      return {
        ...state,
        requesting: true,
        requested: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        requesting: false,
        requested: true,
        status: action.data,
        auth: action.data.auth
      };
    case LOGIN_FAIL:
      return {
        ...state,
        requesting: false,
        requested: true,
        loginError: action.error
      };
    case REGISTER:
      return {
        ...state,
        requesting: true,
        requested: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        requesting: false,
        requested: true,
        status: action.data
      };
    case REGISTER_FAIL:
      return {
        ...state,
        register: false,
        newUser: null,
        registerError: action.error
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case EMPTYSTATU:
      return {
        ...state,
        requested: false,
        status: {
          err: ''
        }
      };
    default:
      return state;
  }
}

export function authed() {
  return function (dispatch, getState) {
    axios.get('/api/auth')
      .then((response) => {
        console.log(response);
        dispatch({
          type: AUTH,
          data: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error
        });
      });
  };
}
export function login(user, pass) {
  return function (dispatch, getState) {
    dispatch({
      type: LOGIN,
    });
    axios.post('/api/login', {user, pass})
      .then(response => {
        dispatch({
          type: LOGIN_SUCCESS,
          data: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error
        });
      });
  };
}

export function register(user, pass) {
  return function (dispatch, getState) {
    dispatch({
      type: LOGIN,
    });
    axios.post('/api/register', {user, pass})
      .then(response => {
        dispatch({
          type: LOGIN_SUCCESS,
          data: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error
        });
      });
  };
}

export function logout() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function emptyStatu() {
  return {
    type: EMPTYSTATU
  };
}

export function test() {
  return function (dispatch, getState) {
    dispatch({
      type: LOGIN,
    });
    axios.get('/api/test')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        dispatch({
          type: LOGIN_FAIL,
          payload: error
        });
      });
  };
}
