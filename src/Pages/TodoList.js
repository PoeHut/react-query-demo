import { useResponseToDo } from "../hooks/GetTodo";
import { Link } from "react-router-dom";

const TodoList = () => {
  const onSuccess = (data) =>
    console.log("Success side effect fetching data >>> ", data);

  const onError = (error) =>
    console.log("Error on side effect data fetching >>> ", error.message);

  const { isLoading, data, error, refetch } = useResponseToDo(
    onSuccess,
    onError,
  );

  return (
    <section>
      <div className="container mx-auto">
        <h1 className="font-bold text-3xl py-4">Todos</h1>
        {isLoading && <p>Loading....</p>}

        {error && <p>{error.message}</p>}

        <ul>
          {data?.map((item) => (
            <li className="py-4 border-b border-gray-300" key={item.id}>
              <Link to={`/todo/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>

        <button
          className="bg-red-700 rounded-md px-4 py-2 mt-4 text-white"
          onClick={refetch}
        >
          Fetch Data
        </button>
      </div>
    </section>
  );
};

export default TodoList;
