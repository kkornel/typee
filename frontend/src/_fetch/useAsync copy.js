import React from 'react';

const initialState = {
  status: 'idle',
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
}

function useAsync() {
  const [{ status, data, error }, dispatch] = React.useReducer(
    (state, action) => ({ ...state, ...action }),
    initialState
  );

  const [{ status, data, error }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  const setState = useSafeDispatch(dispatch);

  const execute = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }

      setState({ status: 'pending' });

      return promise.then(
        (data) => {
          setState({ data, status: 'resolved' });
          return data;
        },
        (error) => {
          setState({ status: 'rejected', error });
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
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

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
