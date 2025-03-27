import { useState, useEffect } from "react";
import { TodosResponse, ListItemType } from "./types";
import List from "./components/List";
import NewItemPopup from "./components/NewItemPopup";
const URL = "https://dummyjson.com/todos";

function App() {
  const [list, setList] = useState<TodosResponse>([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    const request = await fetch(URL);
    const responce = await request.json();
    setList(responce.todos);
    setIsLoading(false);
  };

  const showHidePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const submitItem = (newItem: ListItemType) => {
    list.push(newItem);
    setList(list);
  };

  const deleteItem = (id: number) => {
    const newList = list?.filter((todo) => todo.id !== id);
    setList(newList);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="container">
      <div>
        <List todos={list} onDelete={deleteItem} />
      </div>
      <button id="add-new-btn" onClick={showHidePopup}>
        ADD NEW
      </button>
      {isPopupVisible && (
        <NewItemPopup handleClose={showHidePopup} onSubmit={submitItem} />
      )}
    </div>
  );
}

export default App;
