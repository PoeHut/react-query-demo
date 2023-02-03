import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

// Request todo list
const fetchTodo = async () => {
  const result = await axios.get("http://localhost:4000/todos");
  return result.data;
};

export const useResponseToDo = (onSuccess, onError) => {
  return useQuery("REQUEST_TODOS", fetchTodo, {
    //enabled: false,
    //staleTime: 5000,
    //refetchIntervalInBackground: true,
    onSuccess,
    onError,
    //select: (data) => data.map((item) => item.title),
  });
};

// Request specific todo with initial query data
const fetchToDoById = async ({ queryKey }) => {
  const result = await axios.get(`http://localhost:4000/todos/${queryKey[1]}`);
  return result.data;
};

export const useResponseToDoDetail = (id) => {
  const queryClient = useQueryClient();

  return useQuery(["REQUEST_TODO_BY_ID", id], fetchToDoById, {
    initialData: () => {
      const todo = queryClient
        .getQueryData("REQUEST_TODOS")
        ?.find((data) => data.id === parseInt(id));

      return todo ?? null;
    },
  });
};
