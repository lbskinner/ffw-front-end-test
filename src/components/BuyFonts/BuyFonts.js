import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchData } from "../../API";
import mapStoreToProps from "../../redux/mapStoreToProps";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 70%;
`;

function BuyFonts({ tabsData, buyFontsData, dispatch }) {
  const fetchBuyFontsData = async () => {
    try {
      const buyFontsContent = tabsData[1].content_endpoint;
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
    fetchBuyFontsData();
  }, []);

  return <Wrapper>{buyFontsData.content}</Wrapper>;
}

export default connect(mapStoreToProps)(BuyFonts);
