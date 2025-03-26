import { useState, useEffect } from "react";
import { TodosResponse, ResponseItem } from "./types";
import List from "./components/List";
import NewItemPopup from "./components/NewItemPopup";
const URL = "https://dummyjson.com/todos";

function App() {
  const [list, setList] = useState<TodosResponse | null>(null);
  const [popupVisible, setVisible] = useState(false);

  useEffect(() => {
    fetchData();
    console.log("Fetchgig");
  }, []);

  const fetchData = async () => {
    const request = await fetch(URL);
    const responce: TodosResponse = await request.json();
    setList(responce);
  };

  const showHidePopup = () => {
    setVisible(!popupVisible);
  };

  const submitItem = (newItem: ResponseItem) => {
    const newState = {
      ...list,
      todos: [...list.todos, newItem],
    };
    setList(newState);
  };

  const deleteItem = (id: number) => {
    const newList: ResponseItem[] = list?.todos;
    const itemIndex = newList.findIndex((item: ResponseItem) => item.id === id);
    newList.splice(itemIndex, 1);
    const newState = {
      ...list,
      todos: newList,
    };
    setList(newState);
  };

  if (!list) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div>
        <List todos={list.todos} onDelete={deleteItem} />
      </div>
      <button onClick={showHidePopup}>ADD NEW</button>
      {popupVisible && (
        <NewItemPopup onClose={showHidePopup} onSubmit={submitItem} />
      )}
    </>
  );
}

export default App;
