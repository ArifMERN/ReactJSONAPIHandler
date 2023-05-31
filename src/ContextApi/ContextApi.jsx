import { createContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "./reducer";
export const DataContext = createContext({});

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider
      value={{ data: state.searchData, ...state, dispatch }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default Context;
