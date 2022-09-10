import React from "react"
import ReactDOM from "react-dom"
import App from "./Components/App"
import { createStore, applyMiddleware } from "redux"
import reducers from "./Reducers"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
