import Axios from "axios";
import React from "react";
import "./global.css";

// 페이지의 공통

Axios.defaults.baseURL = "https://gtemoji.herokuapp.com/";
Axios.defaults.withCredentials = true;

const App = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default App;
