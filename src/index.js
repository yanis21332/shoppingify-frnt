import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import App from './App';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers';
import { getItems } from './actions/ItemsAction';
import { getLists } from './actions/ListsAction';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(getItems());
store.dispatch(getLists())

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById("root"));
