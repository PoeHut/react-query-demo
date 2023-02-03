import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const getUserByEmail = async (email) => {
  const result = await axios.get(`http://localhost:4000/users/${email}`);
  return result.data;
};

const getTodoByUser = async (userId) => {
  const result = await axios.get(
    `http://localhost:4000/todos?userId=${userId}`,
  );
  return result.data;
};

const DependentQuery = ({ email }) => {
  const { data: user } = useQuery(["REQUEST_USER_BY_EMAIL", email], () =>
    getUserByEmail(email),
  );
  const userId = user?.userId;

  const { data: todos } = useQuery(
    ["REQUEST_TODO_BY_USER", userId],
    () => getTodoByUser(userId),
    {
      enabled: !!userId,
    },
  );

  return (
    <section>
      <div className="container mx-auto">
        <h1 className="font-bold text-3xl py-4">DependentQuery</h1>
        <h3 className="font-bold text-2xl py-4">User By Email</h3>
        <ul>
          <li>User ID - {user?.id}</li>
          <li>Username - {user?.username}</li>
          <li>Email - {user?.email}</li>
        </ul>

        <h3 className="font-bold text-2xl mt-8">Todo List</h3>
        {todos?.map((todo) => (
          <ul key={todo.id} className="border-b border-gray-200 py-4">
            <li>{todo.title}</li>
            <li>Status - {todo.completed ? "Finished" : "Need to do"}</li>
          </ul>
        ))}
      </div>
    </section>
  );
};

export default DependentQuery;
