const mapStoreToProps = (reduxState) => {
  return {
    store: reduxState,
    tabs: reduxState.tabsReducer,
    buyFonts: reduxState.buyFontsReducer,
    myFonts: reduxState.myFontsReducer,
    myFontSelected: reduxState.myFontSelectedReducer,
  };
};

export default mapStoreToProps;
