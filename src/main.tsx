import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Welcome from "./Welcome";
import Layout from "./components/layout/Layout";
import Test from "./pages/test/Test";
import TestCalendar from "./pages/test/TestCalendar";
import TestCalendarCustom from "./pages/test/TestCalendarCustom";
import TestGesture from "./pages/test/TestGesture";
import TestDate from "./pages/test/TestDate";
import TestSlick from "./pages/test/TestSlick";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <Layout /> } >
                <Route index element={ <Home/> } />
                <Route path="welcome" element={ <Welcome/> } />
            </Route>
            <Route path="/test" element={ <Layout /> }>
                <Route index element={ <Test/> } />
                <Route path="date" element={ <TestDate/> } />
                <Route path="slick" element={ <TestSlick/> } />
                <Route path="gesture" element={ <TestGesture/> } />
                <Route path="calendar" element={ <TestCalendar/> } />
                <Route path="calendarcustom" element={ <TestCalendarCustom/> } />
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
