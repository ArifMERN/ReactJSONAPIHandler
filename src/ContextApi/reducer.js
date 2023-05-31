export const initialState = {
  allData: [],
  searchData: [],
  currentPage: 1,
  pageLimit: 10,
  totalPages: 0,
};
// reducer to handle the actions
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        allData: action.payload.data,
        totalPages: parseInt(action.payload.totalpages),
        searchData: action.payload.data,
      };
    case "PAGE_CHANGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "SET_SEARCH_DATA":
      return {
        ...state,

        searchData: action.payload,
      };
    case "SORT_ASC":
      console.log(action.payload);
      const data = state.searchData.sort((a, b) => a.title - b.title);
      return {
        ...state,
        searchData: data,
      };

    default:
      state;
  }
};
