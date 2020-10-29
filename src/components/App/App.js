import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../../API";
import mapStoreToProps from "../../redux/mapStoreToProps";
import styled from "styled-components";
import BuyFonts from "../BuyFonts/BuyFonts";
import MyFonts from "../MyFonts/MyFonts";

const AppContainer = styled.div`
  height: 100%;
  min-height: 400px;
  width: 55%;
  min-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const FontTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: flex-end;
`;

const Title = styled.h2`
  font-weight: 500;
  margin: 10px 0;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TabText = styled.h6`
  padding: 5px;
  color: red;
  margin: 15px 0 15px 10px;
  font-weight: 450;

  &:hover {
    cursor: pointer;
  }

  &.selected {
    color: rgb(179, 189, 218);
  }

  &:focus {
    outline: thin solid rgb(179, 189, 218);
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

function App({ tabs, myFonts, buyFonts, dispatch }) {
  const [displayMyFonts, setDisplayMyFonts] = useState(true);

  const fetchTabsData = async () => {
    try {
      const tabData = await fetchData("tabs");
      dispatch({
        type: "SET_TAB_DATA",
        payload: [...tabData],
      });
      fetchMyFontsData(tabData[0].content_endpoint);
    } catch (error) {
      console.warn(error);
    }
  };

  const fetchMyFontsData = async (myFontsContent) => {
    try {
      const myFontsData = await fetchData(myFontsContent);
      dispatch({
        type: "SET_MY_FONTS",
        payload: [...myFontsData.content],
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const fetchBuyFontsData = async (buyFontsContent) => {
    try {
      const buyFontsData = await fetchData(buyFontsContent);
      dispatch({
        type: "SET_BUY_FONTS",
        payload: buyFontsData,
      });
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchTabsData();
  }, []);

  const handleClickMyFontsTab = (label) => {
    if (label === "My Fonts") {
      setDisplayMyFonts(true);
      if (myFonts.length === 0) {
        fetchMyFontsData(tabs[0].content_endpoint);
      }
    } else {
      setDisplayMyFonts(false);
      if (Object.keys(buyFonts).length === 0) {
        fetchBuyFontsData(tabs[1].content_endpoint);
      }
    }
  };

  const handlePressEnterKey = (event, label) => {
    if (event.key === "Enter") {
      event.target.blur();
      handleClickMyFontsTab(label);
    }
  };

  return (
    <AppContainer>
      <FontTextContainer>
        <Title>Please select one font</Title>
        <TabContainer>
          {tabs.map((tab) => {
            return (
              <TabText
                key={tab.id}
                onClick={() => handleClickMyFontsTab(tab.label)}
                onKeyPress={(event) => handlePressEnterKey(event, tab.label)}
                className={
                  displayMyFonts && tab.label === "My Fonts"
                    ? "selected"
                    : !displayMyFonts && tab.label === "Buy Fonts"
                    ? "selected"
                    : ""
                }
                role="button"
                tabIndex={0}
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
