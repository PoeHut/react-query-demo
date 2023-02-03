import React from "react";
import { useQueries } from "react-query";
import axios from "axios";

const DynamicParallelQuery = ({ userId }) => {
  const fetchUsers = async (id) => {
    const result = await axios.get(`http://localhost:4000/users/${id}`);
    return result.data;
  };

  const results = useQueries(
    userId.map((id) => {
      return {
        queryKey: ["REQUEST_USER_BY_ID", id],
        queryFn: () => fetchUsers(id),
      };
    }),
  );

  return (
    <section>
      <div className="container mx-auto">
        <h1 className="font-bold text-3xl py-4">User By Id</h1>

        <div>
          {results?.map((result) => (
            <div
              className="py-4 border-b border-gray-300"
              key={result?.data?.id}
            >
              <p>Username: {result?.data?.username}</p>
              <p>Email: {result?.data?.email}</p>
              <p>Phone: {result?.data?.phone}</p>
              <p>Address:</p>
              <ul>
                <li>{result?.data?.address.street}</li>
                <li>{result?.data?.address.suite}</li>
                <li>{result?.data?.address.city}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicParallelQuery;
