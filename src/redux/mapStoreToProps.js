const mapStoreToProps = (reduxState) => {
  return {
    store: reduxState,
    tabsData: reduxState.tabsReducer,
    buyFontsData: reduxState.buyFontsReducer,
    myFontsData: reduxState.myFontsReducer,
  };
};

export default mapStoreToProps;
