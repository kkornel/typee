import React from 'react';

const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  RESOLVED: 'RESOLVED',
};

const initialState = {
  status: STATUS.IDLE,
  data: null,
  error: null,
};

function useSafeDispatch(dispatch) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => (mounted.current = false);
  }, []);

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );

  return React.useCallback((...args) => dispatch(...args), [dispatch]);
}

function reducer(state, action) {
  console.log('REDUCER: new state', { ...state, ...action });
  return {
    ...state,
    ...action,
  };
}

function useAsync() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { status, data, error } = state;

  const setState = useSafeDispatch(dispatch);

  const execute = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }

      setState({ status: STATUS.PENDING });

      return promise.then(
        (data) => {
          setState({ status: STATUS.RESOLVED, data });
          console.log('useAsync() run promise .then data:', data);
          return data;
        },
        (error) => {
          setState({ status: STATUS.REJECTED, error });
          console.log('useAsync() run promise .then error:', error);
          return error;
        }
      );
    },
    [setState]
  );

  const setData = React.useCallback((data) => setState({ data }), [setState]);

  const setError = React.useCallback((error) => setState({ error }), [
    setState,
  ]);
  const reset = React.useCallback(() => setState(initialState), [setState]);

  return {
    isIdle: status === STATUS.IDLE,
    isLoading: status === STATUS.PENDING,
    isError: status === STATUS.REJECTED,
    isSuccess: status === STATUS.RESOLVED,

    setData,
    setError,
    error,
    status,
    data,
    execute,
    reset,
  };
}

export { useAsync };
