import React from 'react';
import logo from './logo.svg';
import './FrontEnd/scss/App.scss';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import NavBar from "./FrontEnd/Pages/00_nav_bar";
import ResearcherUploadImage from "./FrontEnd/Pages/ResearcherSide/01_upload_image";

function App() {
  return (

      <React.Fragment>
          <Router>
              <NavBar />

              <Routes>
                  <Route path={"/test"} element={<ResearcherUploadImage></ResearcherUploadImage>}></Route>
              </Routes>
          </Router>
      </React.Fragment>

  );
}

export default App;
