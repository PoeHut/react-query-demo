import React from "react";
import { useParams } from "react-router-dom";
import { useResponseToDoDetail } from "../hooks/GetTodo";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, data, error } = useResponseToDoDetail(id);

  if (isLoading) return <div>Loading ...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <section>
      <div className="container mx-auto mt-8">
        <ul>
          <li>id - {data?.id}</li>
          <li>Title - {data?.title}</li>
          <li>Status - {data?.completed ? "Completed" : "Need to do."}</li>
        </ul>
      </div>
    </section>
  );
};

export default Detail;
