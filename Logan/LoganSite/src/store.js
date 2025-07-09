import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from 'redux-thunk';

import nativeListReducer from "./views/native-list/redux/reducer";
import nativeLogDetailReducer from "./views/native-log-detail/redux/reducer";
import webListReducer from "./views/web-list/redux/reducer";
import webLogDetailReducer from "./views/web-detail/redux/reducer";

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  nativeList: nativeListReducer,
  nativeLogDetail: nativeLogDetailReducer,
  webList: webListReducer,
  webLogDetail: webLogDetailReducer
});

let store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk
    )
  )
);

export default store;