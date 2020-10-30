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

const PageHeader = styled.h2`
  font-weight: 500;
  margin: 10px 0;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TabText = styled.h6`
  padding: 5px;
  color: ${(props) => (props.selected ? "#b3bdda" : "#ff0000")};
  margin: 15px 0 15px 10px;
  font-weight: 450;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: thin solid #b3bdda;
  }
`;

const FontsContent = styled.div`
  border: 2px solid #b3bdda;
  border-radius: 4px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App({ tabs, myFonts, buyFonts, dispatch }) {
  const [displayMyFonts, setDisplayMyFonts] = useState(true);
  const [myFontsTab, buyFontsTab] = tabs;

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

  const handleClickMyFontsTab = (event, tabLabel) => {
    event.target.blur();
    if (tabLabel === "My Fonts") {
      setDisplayMyFonts(true);
      if (myFonts.length === 0) {
        fetchMyFontsData(myFontsTab.content_endpoint);
      }
    } else {
      setDisplayMyFonts(false);
      if (Object.keys(buyFonts).length === 0) {
        fetchBuyFontsData(buyFontsTab.content_endpoint);
      }
    }
  };

  const handlePressEnterKey = (event, tabLabel) => {
    if (event.key === "Enter") {
      handleClickMyFontsTab(event, tabLabel);
    }
  };

  const tabIsSelected = (tabLabel) => {
    let selected = false;
    if (
      (displayMyFonts && tabLabel === "My Fonts") ||
      (!displayMyFonts && tabLabel === "Buy Fonts")
    ) {
      selected = true;
    }
    return selected;
  };

  return (
    <AppContainer>
      <FontTextContainer>
        <PageHeader>Please select one font</PageHeader>
        <TabContainer>
          {tabs.map((tab) => {
            return (
              <TabText
                key={tab.id}
                onClick={(event) => handleClickMyFontsTab(event, tab.label)}
                onKeyPress={(event) => handlePressEnterKey(event, tab.label)}
                selected={tabIsSelected(tab.label)}
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
