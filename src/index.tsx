import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import axios from "axios";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

// 같은 origin의 경우 request header 에 cookie가 추가되는데
// orgin이 달라지는 경우 자동으로 추가되지 않아 생기는 문제를 해결 하기 위한 조치
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://rem-rest-api.herokuapp.com/api";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
