import { ListItemType } from "../types";
import ListItem from "./ListItem";

export default function List({
  todos,
  onDelete,
}: {
  todos: ListItemType[];
  onDelete: (id: number) => void;
}) {
  return (
    <ul>
      {todos.map((item: ListItemType) => (
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
