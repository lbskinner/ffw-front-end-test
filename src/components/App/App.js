import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../../API";
import mapStoreToProps from "../../redux/mapStoreToProps";
import BuyFonts from "../BuyFonts/BuyFonts";
import MyFonts from "../MyFonts/MyFonts";

import "./App.css";

function App({ store, dispatch }) {
  const [displayMyFonts, setDisplayMyFonts] = useState(true);
  const [tabsData, setTabsData] = useState([]);

  const fetchTabsData = async () => {
    try {
      const tabData = await fetchData("tabs");
      setTabsData([...tabData]);
      dispatch({
        type: "SET_TAB_DATA",
        payload: [...tabData],
      });
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
          {store.tabsReducer.map((tab) => {
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

export default connect(mapStoreToProps)(App);
