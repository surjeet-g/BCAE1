import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import RootReducer from "./Reducers";

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

export const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);
