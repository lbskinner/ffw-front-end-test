import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 20px;
`;

const ColorBlock = styled.div`
  width: 88px;
  height: 88px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: ${(props) => props.colorProps};
  padding: 5px;
  background-clip: content-box;
  box-shadow: inset 0 0 0 5px #fff;
  position: relative;
`;

const ColoredLetter = styled.span`
  position: absolute;
  bottom: 10px;
  left: 16px;
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  opacity: 0.3;
`;

function MyFonts() {
  const [myFontsData, setMyFontsData] = useState([]);

  const fetchMyFontsData = async () => {
    try {
      const url = "http://json.ffwagency.md/fonts_a";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.content);
      setMyFontsData([...data.content]);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetchMyFontsData();
  }, []);

  return (
    <Wrapper>
      <ul>
        {myFontsData.map((font) => {
          return (
            <div key={font.id}>
              <ColorBlock colorProps={font.color}>
                <ColoredLetter>{font.abbr}</ColoredLetter>
              </ColorBlock>
              <li>{font.label}</li>
            </div>
          );
        })}
      </ul>
    </Wrapper>
  );
}

export default MyFonts;
