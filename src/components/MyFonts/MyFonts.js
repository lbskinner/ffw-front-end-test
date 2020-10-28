import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 20px;
`;
const List = styled.ul`
  display: grid;
  grid-template-columns: fit-content(40%) auto;
  grid-template-rows: auto auto;
  grid-auto-flow: column;
`;

const FontItem = styled.div`
  display: flex;
  justify-content: space-between;

  &:first-child {
    flex-direction: column;
    grid-column: 1;
    grid-row: 1 / 3;
  }

  &:nth-child(n + 2) {
    align-items: center;
  }
`;

const ColorBlock = styled.div`
  width: 90px;
  height: 90px;
  border: ${(props) =>
    props.selectProps
      ? "1px solid rgba(0, 0, 0, 0.5)"
      : "1px solid rgb(0, 0, 0)"};
  border-radius: 15px;
  background-color: ${(props) => props.colorProps};
  padding: 4px;
  background-clip: content-box;
  box-shadow: inset 0 0 0 4px #fff;
  position: relative;

  &:hover {
    cursor: pointer;
  }
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

const ListItem = styled.li`
  display: inline-flex;
  font-size: 1rem;
  //   width: 50%;
  color: ${(props) =>
    props.selectProps ? "rgba(0, 0, 0, 0.5)" : "rgb(0, 0, 0)"};
`;

function MyFonts() {
  const [myFontsData, setMyFontsData] = useState([]);
  const [fontIdClicked, setFontIdClicked] = useState();

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

  const handleClickFontCard = (fontId) => {
    console.log(fontId);
    setFontIdClicked(fontId);
  };

  return (
    <Wrapper>
      <List>
        {myFontsData.map((font) => {
          return (
            <FontItem key={font.id}>
              <ListItem selectProps={font.id === fontIdClicked}>
                <ColorBlock
                  colorProps={font.color}
                  selectProps={font.id === fontIdClicked}
                  onClick={() => handleClickFontCard(font.id)}
                >
                  <ColoredLetter>{font.abbr}</ColoredLetter>
                </ColorBlock>
                <div> {font.label}</div>
              </ListItem>
            </FontItem>
          );
        })}
      </List>
    </Wrapper>
  );
}

export default MyFonts;
