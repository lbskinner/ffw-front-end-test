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

const FontCard = styled.div`
  width: 85px;
  height: 85px;
  border: ${(props) =>
    props.selected
      ? "1px solid rgba(0, 0, 0, 0.5)"
      : "1px solid rgba(0, 0, 0, 1)"};
  border-radius: 15px;
  background-color: ${(props) => props.color};
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

const FontAbbreviation = styled.span`
  position: absolute;
  bottom: 10px;
  left: 16px;
  font-size: 1.5em;
  font-weight: 900;
  color: #fff;
  opacity: 0.3;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;

  @media screen and (min-width: 900px) {
    &:first-child {
      flex-direction: column;
      grid-column: 1;
      grid-row: 1 / 3;
    }

    &:first-of-type ${FontCard} {
      width: 120px;
      height: 120px;
    }

    &:first-of-type :first-child ${FontAbbreviation} {
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
    props.selected ? "rgba(191, 183, 183, 0.5)" : "rgba(191, 183, 183, 1)"};
  font-size: 1.5rem;
  line-height: 1rem;
`;

const FontLabel = styled.span`
  color: ${(props) =>
    props.selected ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 1)"};
  font-size: 1rem;
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

  const handleClickFontCard = (event, font) => {
    event.target.blur();
    dispatch({
      type: "SET_MY_FONT_SELECTED",
      payload: font,
    });
  };

  const handlePressEnterKey = (event, font) => {
    if (event.key === "Enter") {
      handleClickFontCard(event, font);
    }
  };

  return (
    <Wrapper>
      <List>
        {myFonts.map((font) => {
          const selected = font.id === myFontSelected.id;
          return (
            <ListItem key={font.id}>
              <FontCard
                color={font.color}
                selected={selected}
                onClick={(event) => handleClickFontCard(event, font)}
                onKeyPress={(event) => handlePressEnterKey(event, font)}
                onMouseEnter={() =>
                  setDisplayColorLabel(font["color-blind-label"])
                }
                onMouseLeave={() => setDisplayColorLabel()}
                tabIndex={0}
                role="button"
                aria-label={`font card ${font["color-blind-label"]}`}
              >
                <FontAbbreviation>{font.abbr}</FontAbbreviation>
              </FontCard>
              {displayColorLabel === font["color-blind-label"] && (
                <ColorLabel>{font["color-blind-label"]}</ColorLabel>
              )}
              <ListDot selected={selected}>
                <FontLabel selected={selected}>{font.label}</FontLabel>
              </ListDot>
            </ListItem>
          );
        })}
      </List>
    </Wrapper>
  );
}

export default connect(mapStoreToProps)(MyFonts);
