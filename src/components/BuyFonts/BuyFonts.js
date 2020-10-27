import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 70%;
`;

function BuyFonts() {
  const [buyFontsData, setBuyFontsData] = useState();
  const fetchBuyFontsData = async () => {
    try {
      const url = "http://json.ffwagency.md/fonts_b";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.content);
      setBuyFontsData(data.content);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchBuyFontsData();
  }, []);

  return <Wrapper>{buyFontsData}</Wrapper>;
}

export default BuyFonts;
