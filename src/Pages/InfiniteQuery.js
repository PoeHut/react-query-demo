import React, { useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const InfiniteQuery = () => {
  const [newColor, setNewColor] = useState({});
  const queryClient = useQueryClient();

  // INFINITE QUERY
  const fetchColors = async ({ pageParam = 1 }) => {
    const result = await axios.get(
      `http://localhost:4000/colors?_limit=2&_sort=id&_order=desc&_page=${pageParam}`,
    );
    return result.data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery("colors", fetchColors, {
      getNextPageParam: (_lastPage, pages) => pages.length + 1,
    });

  // MUTATION
  const mutation = useMutation(
    (data) => axios.post("http://localhost:4000/colors", data),
    {
      onSuccess: (data) => {
        //queryClient.invalidateQueries("colors");
        queryClient.setQueryData("colors", (oldData) => {
          //const newArray = [].concat(...oldData.pages);
          const newArray = oldData.pages.flat();
          const newData = [data.data, ...newArray];
          if (newData.length > 2) {
            newData.length = 2;
          }

          return { pages: [newData] };
        });
      },
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(newColor);
  };

  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <div className="container mx-auto">
        <h1 className="font-bold text-3xl py-4">Mutations</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newColor.name}
            onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
            className="border border-gray-200 p-2 mr-2 mb-4 w-1/4"
          />
          <button
            type="submit"
            className="rounded-md px-4 py-2 mt-4 mr-2 text-white bg-blue-500"
          >
            Save
          </button>
        </form>

        <h1 className="font-bold text-3xl py-4">Infinite Query</h1>

        <div>
          {data?.pages?.map((group, i) => (
            <ul key={i}>
              {group?.map((color) => (
                <li key={color.id} className="text-2xl font-bold p-4">
                  {color.name}
                </li>
              ))}
            </ul>
          ))}
        </div>

        <button
          className={`rounded-md px-4 py-2 mt-4 mr-2 text-white ${
            hasNextPage ? "bg-red-700" : "bg-gray-200"
          }`}
          disabled={!hasNextPage}
          onClick={fetchNextPage}
        >
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </section>
  );
};

export default InfiniteQuery;
