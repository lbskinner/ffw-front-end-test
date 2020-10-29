import React, { useState } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 40px;
`;
const List = styled.ul`
  display: grid;
  row-gap: 20px;
  padding: 0;
  margin: 0;
  @media screen and (min-width: 900px) {
    grid-template-columns: minmax(30%, 50%) auto;
    grid-template-rows: repeat(2, minmax(120px, auto));
    grid-auto-flow: column;
  }
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: ${(props) =>
    props.selectProps ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 1)"};

  @media screen and (min-width: 900px) {
    &:first-child {
      flex-direction: column;
      grid-column: 1;
      grid-row: 1 / 3;
    }

    &:first-of-type div {
      width: 120px;
      height: 120px;
    }

    &:first-of-type :first-child span {
      font-size: 2.3em;
    }
  }
`;

const ListDot = styled.p`
  display: list-item;
  width: 50%;
  margin-left: 1em;
  margin-top: 10px;
  color: ${(props) =>
    props.selectProps ? "rgba(191, 183, 183, 0.5)" : "rgba(191, 183, 183, 1)"};
  font-size: 1.5rem;
  line-height: 1rem;
`;

const FontLabel = styled.span`
  color: ${(props) =>
    props.selectProps ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 1)"};
  font-size: 1rem;
`;

const ColorBlock = styled.div`
  width: 85px;
  height: 85px;
  border: ${(props) =>
    props.selectProps
      ? "1px solid rgba(0, 0, 0, 0.5)"
      : "1px solid rgba(0, 0, 0, 1)"};
  border-radius: 15px;
  background-color: ${(props) => props.colorProps};
  padding: 4px;
  background-clip: content-box;
  box-shadow: inset 0 0 0 4px #fff;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: solid rgb(179, 189, 218);
  }
`;

const ColoredLetter = styled.span`
  position: absolute;
  bottom: 10px;
  left: 16px;
  font-size: 1.5em;
  font-weight: 900;
  color: #fff;
  opacity: 0.3;
`;

const ColorLabel = styled.span`
  position: absolute;
  transform: translateX(140%);
  margin-top: 10px;
  font-size: 1em;
  pointer-events: none;
`;

function MyFonts({ myFonts, myFontSelected, dispatch }) {
  const [displayColorLabel, setDisplayColorLabel] = useState();

  const handleClickFontCard = (font) => {
    dispatch({
      type: "SET_MY_FONT_SELECTED",
      payload: font,
    });
  };

  const handlePressEnterKey = (event, font) => {
    if (event.key === "Enter") {
      event.target.blur();
      handleClickFontCard(font);
    }
  };

  const onMouseEnter = (colorLabel) => {
    setDisplayColorLabel(colorLabel);
  };

  const onMouseLeave = () => {
    setDisplayColorLabel();
  };

  return (
    <Wrapper>
      <List>
        {myFonts.map((font) => {
          return (
            <ListItem key={font.id}>
              <ColorBlock
                colorProps={font.color}
                selectProps={font.id === myFontSelected.id}
                onClick={() => handleClickFontCard(font)}
                onKeyPress={(event) => handlePressEnterKey(event, font)}
                onMouseEnter={() => onMouseEnter(font["color-blind-label"])}
                onMouseLeave={onMouseLeave}
                tabIndex={0}
                role="button"
                aria-label={`font card ${font["color-blind-label"]}`}
              >
                <ColoredLetter>{font.abbr}</ColoredLetter>
              </ColorBlock>
              {displayColorLabel === font["color-blind-label"] && (
                <ColorLabel>{font["color-blind-label"]}</ColorLabel>
              )}
              <ListDot selectProps={font.id === myFontSelected.id}>
                <FontLabel selectProps={font.id === myFontSelected.id}>
                  {font.label}
                </FontLabel>
              </ListDot>
            </ListItem>
          );
        })}
      </List>
    </Wrapper>
  );
}

export default connect(mapStoreToProps)(MyFonts);
