import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../ContextApi/ContextApi";

const DataGrid = () => {
  const { data, currentPage, pageLimit, dispatch } = useContext(DataContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const checkCache = (currentPage) => {
    const cacheData = JSON.parse(localStorage.getItem("posts")) || [];
    if (cacheData.length !== 0) {
      const index = cacheData.findIndex((post) => {
        return post.page == currentPage;
      });
      if (index !== -1) return cacheData[index].posts;
      return [];
    }
  };

  const addToCache = (data, currentPage) => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push({ page: currentPage, posts: [...data] });
    localStorage.setItem("posts", JSON.stringify(posts));
  };
  const fetchData = async () => {
    setLoading((prev) => !prev);
    let totalpages = 2;
    let cache = checkCache(currentPage);
    console.log(cache);
    if (cache.length == 0) {
      await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${currentPage}&_limit=${pageLimit}`
      )
        .then((response) => {
          totalpages = response.headers.get("X-Total-Count");
          return response.json();
        })
        .then((json) => {
          dispatch({
            type: "ADD_DATA",
            payload: { data: json, totalpages: totalpages },
          });

          addToCache(json, currentPage);
        })
        .catch((e) => setError((prev) => !prev));
    } else {
      dispatch({
        type: "ADD_DATA",
        payload: {
          data: cache,
          totalpages: 100,
        },
      });
    }
    setLoading((prev) => !prev);
  };
  return (
    <main>
      {error ? (
        "Something is wrong Try again.."
      ) : (
        <>
          {loading ? (
            "loading..."
          ) : (
            <div className="table-container">
              {data.length === 0 ? (
                "no data found.."
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      {Object.keys(data[0]).map((key) => (
                        <th
                          key={key}
                          onClick={() => {
                            dispatch({ type: "SORT_ASC", payload: key });
                          }}
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        {Object.values(item).map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default DataGrid;
