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
import ResearcherAnalytics from "./FrontEnd/Pages/ResearcherSide/02_analytics";
import ResearcherGenerateResults from "./FrontEnd/Pages/ResearcherSide/03_generate_results";

import ParticipantActivityScreen from "./FrontEnd/Pages/ParticipantSide/01_activity_screen";
import ThankyouScreen from "./FrontEnd/Pages/ParticipantSide/02_thankyou_screen";

function App() {
  return (

      <React.Fragment>
          <Router>
              <NavBar />

              <Routes>
                  <Route path={"/"} element={<HomeScreen></HomeScreen>}></Route>

                  <Route path={"/image-upload-options"} element={<ResearcherUploadImage></ResearcherUploadImage>}></Route>
                  <Route path={"/activity"} element={<ParticipantActivityScreen></ParticipantActivityScreen>}></Route>
                  <Route path={"/thankyou"} element={<ThankyouScreen></ThankyouScreen>}></Route>
                  <Route path={"/results"} element={<ResearcherGenerateResults></ResearcherGenerateResults>}></Route>

                  <Route path={"/analytics"} element={<ResearcherAnalytics></ResearcherAnalytics>}></Route>

              </Routes>
          </Router>
      </React.Fragment>

  );
}

export default App;
