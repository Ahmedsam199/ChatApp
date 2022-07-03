import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import {store} from "./state/store";
import { persistor } from "./state/store";
import axios from 'axios'
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));

axios.interceptors.request.use(async (config) => {
  const val = localStorage.getItem("JWT");
  if(!val){
    return config
  }else{

    config.headers = {
      Authorization: `Bearer ${val}`,
    };

    return config;
  }
});




root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
