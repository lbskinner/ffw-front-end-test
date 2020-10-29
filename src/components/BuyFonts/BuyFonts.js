import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 70%;
`;

function BuyFonts({ buyFonts }) {
  return <Wrapper>{buyFonts.content}</Wrapper>;
}

export default connect(mapStoreToProps)(BuyFonts);
