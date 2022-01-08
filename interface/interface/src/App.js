import React from "react";
import FAQ from "./components/FAQ.jsx";
// import './App.css';
import Header from "./components/Header.jsx";
import Mint from "./components/Mint.jsx";
import OurStory  from "./components/OurStory.jsx";
import RoadMap from "./components/RoadMap.jsx";
import Socials from "./components/Socials.jsx";
import Team from "./components/Team.jsx";

function App() {
  return (
    <>
      <div className="App">
        <Header/>
        <div className="f-heading">
          <h1>About MetaSneakersClub Project</h1>
          <p>We are 2 boys who love sneakers and we want to share our passion with you</p>
        </div>
        <OurStory/>
        <RoadMap/>
        <Mint/>
        <Team/>
        <FAQ/>
        <Socials/>
      
      </div>
    </>
  );
}

export default App;
