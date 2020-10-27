import React from "react";
import BuyFonts from "../BuyFonts/BuyFonts";
import MyFonts from "../MyFonts/MyFonts";
import "./App.css";

function App() {
  return (
    <div className="AppContainer">
      <div className="textContainer">
        <h2>Please select one font</h2>
        <div className="tabContainer">
          <h6>MY FONTS</h6>
          <h6>BUY FONTS</h6>
        </div>
      </div>
      <div className="fontsContainer">
        <MyFonts />
        <BuyFonts />
      </div>
    </div>
  );
}

export default App;
