import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const ParallelQuery = () => {
  // Request todo list
  const fetchTodo = async () => {
    const result = await axios.get("http://localhost:4000/todos");
    return result.data;
  };

  const fetchUsers = async () => {
    const result = await axios.get("http://localhost:4000/users");
    return result.data;
  };

  const { data: todos } = useQuery("REQUEST_TODO", fetchTodo);
  const { data: users } = useQuery("REQUEST_USERS", fetchUsers);

  return (
    <section>
      <div className="container mx-auto">
        <h1 className="font-bold text-3xl py-4">Todos</h1>
        <ul>
          {todos?.map((todo) => (
            <li className="py-4 border-b border-gray-300" key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>

        <h1 className="font-bold text-3xl py-4">Users</h1>
        <ul>
          {users?.map((user) => (
            <li className="py-4 border-b border-gray-300" key={user.id}>
              {user.name} - {user.email} - {user.phone}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ParallelQuery;
