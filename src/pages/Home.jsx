import React, {
  useState,
  useContext,
  lazy,
  Suspense,
  useEffect,
  useReducer,
} from "react";
const DataGrid = lazy(() => import("../components/DataGrid"));
import GlobalSearch from "../components/GlobalSearch";
import { reducer } from "../ContextApi/reducer";
const Pagination = lazy(() => import("../components/Pagination"));

const Home = () => {
  return (
    <div>
      <GlobalSearch />
      <Suspense fallback="loading">
        <DataGrid />
      </Suspense>
      <Suspense fallback="loading..">
        <Pagination />
      </Suspense>
    </div>
  );
};

export default Home;
