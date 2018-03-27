export default function promiseMiddleware() {
  return ({dispatch, getState}) => next => (action) => {
    console.log(next);
    console.log(action);
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    const {types, promise, ...rest} = action;
    if (!promise) {
      return next(action);
    }
    console.log(types);
    const [PENDING, SUCCESS, FAIL] = types;
    console.log(PENDING);
    dispatch({type: PENDING, ...rest});
    return action.promise.then(response => {
      const {data} = response;
      return dispatch({type: SUCCESS, response: data, ...rest});
    }).catch((error) => {
      const {data} = error;
      return dispatch({type: SUCCESS, error: data, ...rest});
    });
  };
}
