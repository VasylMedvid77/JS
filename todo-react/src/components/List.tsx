import { ResponseItem } from "../types";
import ListItem from "./ListItem";

export default function List({ todos, onDelete }: { todos: ResponseItem[] }) {
  return (
    <ul>
      {todos.map((item: ResponseItem) => (
        <ListItem
          key={item.id}
          id={item.id}
          text={item.todo}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
