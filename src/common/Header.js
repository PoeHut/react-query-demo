import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="text-white body-font bg-teal-700">
      <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <span className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="ml-3 text-xl">React Query Demo</span>
        </span>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/">
            <span className="mr-5 hover:text-gray-900">Home</span>
          </Link>
          <Link to="/todos">
            <span className="mr-5 hover:text-gray-900">Todos</span>
          </Link>
          <Link to="/parallel-query">
            <span className="mr-5 hover:text-gray-900">ParallelQuery</span>
          </Link>
          <Link to="/dynamic-parallel-query">
            <span className="mr-5 hover:text-gray-900">
              DynamicParallelQuery
            </span>
          </Link>
          <Link to="/dependent-query">
            <span className="mr-5 hover:text-gray-900">DependentQuery</span>
          </Link>
          <Link to="/paginate-query">
            <span className="mr-5 hover:text-gray-900">PaginateQuery</span>
          </Link>
          <Link to="/infinite-query">
            <span className="mr-5 hover:text-gray-900">InfiniteQuery</span>
          </Link>
          <Link to="/mutation-data">
            <span className="mr-5 hover:text-gray-900">MutationData</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
