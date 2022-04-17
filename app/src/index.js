import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AxiosInterceptor } from "./interceptors/axios.interceptor";
import { LoaderContextProvider } from "./context/loader/loader.context";
import { DialogContextProvider } from "./context/dialog/dialog.context";
import "./index.css";

AxiosInterceptor.setup();

ReactDOM.render(
  <React.StrictMode>
    <LoaderContextProvider>
      <DialogContextProvider>
        <App />
      </DialogContextProvider>
    </LoaderContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
