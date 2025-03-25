import { ResponceItem } from "../types";
import ListItem from "./ListItem";

type Props = {
  todos: ResponceItem[];
};

export default function List({ todos }: Props) {
  return (
    <ul>
      {todos.map((item: ResponceItem) => (
        <ListItem key={item.id} text={item.todo} />
      ))}
    </ul>
  );
}
