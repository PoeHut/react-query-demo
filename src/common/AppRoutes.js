import { Routes, Route } from "react-router-dom";
import DependentQuery from "../Pages/DependentQuery";
import Detail from "../Pages/Detail";
import DynamicParallelQuery from "../Pages/DynamicParallelQuery";
import Home from "../Pages/Home";
import InfiniteQuery from "../Pages/InfiniteQuery";
import MutationData from "../Pages/MutationData";
import PaginateQuery from "../Pages/PaginateQuery";
import ParallelQuery from "../Pages/ParallelQuery";
import TodoList from "../Pages/TodoList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="todos" element={<TodoList />} />
      <Route path="todo/:id" element={<Detail />} />
      <Route path="parallel-query" element={<ParallelQuery />} />
      <Route
        path="dynamic-parallel-query"
        element={<DynamicParallelQuery userId={[2, 3, 5]} />}
      />
      <Route
        path="dependent-query"
        element={<DependentQuery email="sincere@april.biz" />}
      />
      <Route path="paginate-query" element={<PaginateQuery />} />
      <Route path="infinite-query" element={<InfiniteQuery />} />
      <Route path="mutation-data" element={<MutationData />} />
    </Routes>
  );
};

export default AppRoutes;
