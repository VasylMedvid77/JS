import { useState, useEffect } from "react";
import { TodosResponce } from "./types";
import List from "./components/List";
const URL = "https://dummyjson.com/todos";

function App() {
  const [list, setList] = useState<TodosResponce | null>(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const request = await fetch(URL);
    const responce: TodosResponce = await request.json();
    setList(responce);
  };
  if (!list) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <List todos={list.todos} />
    </div>
  );
}

export default App;
