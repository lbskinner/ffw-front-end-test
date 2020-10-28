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
    <AppContainer>
      <FontTextContainer>
        <h2>Please select one font</h2>
        <TabContainer>
          {store.tabsReducer.map((tab) => {
            return (
              <TabText
                key={tab.id}
                onClick={() => handleClickMyFontsTab(tab.label)}
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
