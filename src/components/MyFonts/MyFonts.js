import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 30px;
  //   height: 80%;
`;
const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-auto-flow: column;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: ${(props) =>
    props.selectProps ? "rgba(0, 0, 0, 0.5)" : "rgb(0, 0, 0)"};

  &:first-child {
    flex-direction: column;
    grid-column: 1;
    grid-row: 1 / 3;
  }
`;

const FontLabel = styled.p`
  display: list-item;
  width: 50%;
  margin-left: 1em;
`;

const ColorBlock = styled.div`
  width: 90px;
  //   padding-top: 50%;
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
  font-size: 2em;
  font-weight: 900;
  color: #fff;
  opacity: 0.3;
`;

function MyFonts({ myFonts, myFontSelected, dispatch }) {
  const handleClickFontCard = (font) => {
    dispatch({
      type: "SET_MY_FONT_SELECTED",
      payload: font,
    });
  };

  return (
    <Wrapper>
      <List>
        {myFonts.map((font) => {
          return (
            // <FontItem >
            <ListItem key={font.id} selectProps={font.id === myFontSelected.id}>
              <ColorBlock
                colorProps={font.color}
                selectProps={font.id === myFontSelected.id}
                onClick={() => handleClickFontCard(font)}
              >
                <ColoredLetter>{font.abbr}</ColoredLetter>
              </ColorBlock>
              <FontLabel>{font.label}</FontLabel>
            </ListItem>
            // </FontItem>
          );
        })}
      </List>
    </Wrapper>
  );
}

export default connect(mapStoreToProps)(MyFonts);
