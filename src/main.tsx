import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Home";
import Test from "./Test";
import Welcome from "./Welcome";
import Layout from "./Layout";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout /> } >
                <Route path="/" element={ <Home/> } />
                <Route path="/test" element={ <Test/> } />
                <Route path="/welcome" element={ <Welcome/> } />
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
