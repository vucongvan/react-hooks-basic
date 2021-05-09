import { useEffect, useState } from "react";
import "./App.scss";
import Pagination from "./components/Pagination";
import PostList from "./components/PostList";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import queryString from "query-string";
import PostFiltersForm from "./components/PostFiltersForm";
import Clock from "./components/Clock";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love Easy Frontend! 😍 " },
    { id: 2, title: "We love Easy Frontend! 🥰 " },
    { id: 3, title: "They love Easy Frontend! 🚀 " },
  ]);

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: "",
  });

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  });

  function handlePageChange(newPage) {
    console.log("New page:", newPage);
    setFilters({
      ...filters,
      _page: newPage,
    });
  }

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);

        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list: ", error.message);
      }
    }
    console.log("Todo list aaa");
    fetchPostList();
  }, [filters]);

  // useEffect(() => {
  //   console.log('Todo list effect');
  // });

  function handleTodoClick(todo) {
    const index = todoList.findIndex((x) => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    //add new todo to current todo list
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFilterChange(newFilters) {
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
    console.log("tu khoa search:" + newFilters.searchTerm);
  }
  
  const [showClock, setShowClock] = useState(true);

  return (
    <div className="app">
      <h1>Welcome to Post List</h1>
      {/* <TodoForm onSubmit={handleTodoFormSubmit} /> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      {/* <PostFiltersForm onSubmit={handleFilterChange} />
      <PostList posts={postList} />

      <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
      
     
      { showClock && <Clock/>}
      <button type="button" onClick={() => setShowClock(false)}>Hide Clock</button>
    </div>
  );
}

export default App;
