import React from 'react';
import './FrontEnd/scss/App.scss';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import NavBar from "./FrontEnd/Pages/00_nav_bar";
import HomeScreen from "./FrontEnd/Pages/01_home_screen";
import ResearcherUploadImage from "./FrontEnd/Pages/ResearcherSide/01_upload_image_options";

function App() {
  return (

      <React.Fragment>
          <Router>
              <NavBar />

              <Routes>
                  <Route path={"/"} element={<HomeScreen></HomeScreen>}></Route>
                  <Route path={"/image-upload-options"} element={<ResearcherUploadImage></ResearcherUploadImage>}></Route>
              </Routes>
          </Router>
      </React.Fragment>

  );
}

export default App;
