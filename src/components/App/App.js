import React, { useState } from "react";
import BuyFonts from "../BuyFonts/BuyFonts";
import MyFonts from "../MyFonts/MyFonts";
import "./App.css";

function App() {
  const [displayMyFonts, setDisplayMyFonts] = useState(true);

  const handleClickMyFontsTab = () => {
    setDisplayMyFonts(true);
  };

  const handleClickBuyFontsTab = () => {
    setDisplayMyFonts(false);
  };

  return (
    <div className="AppContainer">
      <div className="textContainer">
        <h2>Please select one font</h2>
        <div className="tabContainer">
          <h6 onClick={handleClickMyFontsTab}>MY FONTS</h6>
          <h6 onClick={handleClickBuyFontsTab}>BUY FONTS</h6>
        </div>
      </div>
      <div className="fontsContainer">
        {displayMyFonts ? <MyFonts /> : <BuyFonts />}
      </div>
    </div>
  );
}

export default App;
