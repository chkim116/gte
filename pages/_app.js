import React from "react";
import "./global.css";

// 페이지의 공통

const App = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default App;
