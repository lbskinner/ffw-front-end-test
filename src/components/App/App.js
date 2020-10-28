import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../../API";
import mapStoreToProps from "../../redux/mapStoreToProps";
import styled from "styled-components";
import BuyFonts from "../BuyFonts/BuyFonts";
import MyFonts from "../MyFonts/MyFonts";

const AppContainer = styled.div`
  height: 450px;
  width: 65%;
  min-width: 500px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;

const FontTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: flex-end;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TabText = styled.h6`
  padding-left: 20px;
  color: red;

  &:hover {
    cursor: pointer;
  }

  &.selected {
    color: rgb(179, 189, 218);
  }
`;

const FontsContent = styled.div`
  border: 2px solid rgb(179, 189, 218);
  border-radius: 4px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App({ tabsData, dispatch }) {
  const [displayMyFonts, setDisplayMyFonts] = useState(true);

  const fetchTabsData = async () => {
    try {
      const tabData = await fetchData("tabs");
      dispatch({
        type: "SET_TAB_DATA",
        payload: [...tabData],
      });
    } catch (error) {
      console.warn(error);
    }
  };

  // const fetchBuyFontsData = async () => {
  //   try {
  //     const buyFontsContent = store.tabsReducer[1].content_endpoint;
  //     console.log(buyFontsContent);
  //     const buyFontsData = await fetchData()
  //     const url = "http://json.ffwagency.md/fonts_b";
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.log(data.content);
  //     setBuyFontsData(data.content);
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  useEffect(() => {
    fetchTabsData();
  }, []);

  const handleClickMyFontsTab = (label) => {
    if (label === "My Fonts") {
      setDisplayMyFonts(true);
    } else {
      setDisplayMyFonts(false);
    }
  };

  return (
    <AppContainer>
      <FontTextContainer>
        <h2>Please select one font</h2>
        <TabContainer>
          {tabsData.map((tab) => {
            return (
              <TabText
                key={tab.id}
                onClick={() => handleClickMyFontsTab(tab.label)}
                className={
                  displayMyFonts && tab.label === "My Fonts"
                    ? "selected"
                    : !displayMyFonts && tab.label === "Buy Fonts"
                    ? "selected"
                    : ""
                }
              >
                {tab.label.toUpperCase()}
              </TabText>
            );
          })}
        </TabContainer>
      </FontTextContainer>
      <FontsContent>{displayMyFonts ? <MyFonts /> : <BuyFonts />}</FontsContent>
    </AppContainer>
  );
}

export default connect(mapStoreToProps)(App);
