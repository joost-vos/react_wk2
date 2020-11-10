import { createStore } from 'redux';
import { initiaState, Reducer } from "./reducer";
// import { initiaState, Reducer } from './reducer'

export const ConfigureStore = () => {
  const store = createStore(
      Reducer, // reducer
      initiaState, // our initialState
  );

  return store;
}