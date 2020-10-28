import React, { useState, useEffect } from "react";
import BuyFonts from "../BuyFonts/BuyFonts";
import MyFonts from "../MyFonts/MyFonts";
import "./App.css";

function App() {
  const [displayMyFonts, setDisplayMyFonts] = useState(true);
  const [tabsData, setTabsData] = useState([]);

  const fetchTabsData = async () => {
    try {
      const url = "http://json.ffwagency.md/tabs";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setTabsData([...data]);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchTabsData();
  }, []);

  const handleClickMyFontsTab = (label) => {
    label === "My Fonts" ? setDisplayMyFonts(true) : setDisplayMyFonts(false);
  };

  return (
    <div className="AppContainer">
      <div className="textContainer">
        <h2>Please select one font</h2>
        <div className="tabContainer">
          {tabsData.map((tab) => {
            return (
              <h6 key={tab.id} onClick={() => handleClickMyFontsTab(tab.label)}>
                {tab.label.toUpperCase()}
              </h6>
            );
          })}
        </div>
      </div>
      <div className="fontsContainer">
        {displayMyFonts ? <MyFonts /> : <BuyFonts />}
      </div>
    </div>
  );
}

export default App;
