import React from "react";
import BuyFonts from "../BuyFonts/BuyFonts";
import MyFonts from "../MyFonts/MyFonts";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        Please select one font
        <MyFonts />
        <BuyFonts />
      </div>
    </div>
  );
}

export default App;
