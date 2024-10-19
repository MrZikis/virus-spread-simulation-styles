import React from 'react';
import Layout from "./pages/Layout";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
      <Router>
          <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/stats" element={<MainPage/>}/>
            </Route>
        </Routes>
      </Router>
  );
}

export default App;
