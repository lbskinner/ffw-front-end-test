const mapStoreToProps = (reduxState) => {
  return {
    store: reduxState,
    tabsData: reduxState.tabsReducer,
  };
};

export default mapStoreToProps;
