const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

const initialState = {
    loaded: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                data: action.data
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                data: action.data
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginError: action.error
            };
        case REGISTER:
            return {
                ...state,
                register: true,
                newUser: null
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                register: false,
                newUser: action.result
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
        default:
            return state;
    }
}

export function login(id) {
    return function(dispatch, getState) {
        dispatch({
            type: LOGIN,
        })
        axios.post('/api/getVerif')
            .then(response => {
                console.log(response)
                dispatch({
                    type: LOGIN_SUCCESS,
                    data: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: error
                })
            })
    }
}

export function logout() {
    return {
        type: LOGOUT_SUCCESS
    };
}
