import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchColors = async (page) => {
  const result = await axios.get(
    `http://localhost:4000/colors?_limit=2&_page=${page}`,
  );
  return result.data;
};

const PaginateQuery = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, error, data, isFetching } = useQuery(
    ["REQUEST_COLORS", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    },
  );

  return (
    <section>
      <div className="container mx-auto">
        <h1 className="font-bold text-3xl py-4">Paginate Query</h1>
        {isLoading && <div>Loading ...</div>}

        {error && <div>{error.message}</div>}

        <ul>
          {data?.map((color) => (
            <li key={color.id} className="text-2xl font-bold p-4">
              {`${color.id}. ${color.name}`}
            </li>
          ))}
        </ul>

        {isFetching && <div>Loading ...</div>}

        <button
          className="bg-red-700 rounded-md px-4 py-2 mt-4 mr-2 text-white"
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((pg) => pg - 1)}
        >
          Previous
        </button>

        <button
          className="bg-red-700 rounded-md px-4 py-2 mt-4 text-white"
          disabled={pageNumber === 4}
          onClick={() => setPageNumber((pg) => pg + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default PaginateQuery;
