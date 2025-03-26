import { useState } from "react";

export default function ListItem({
  id,
  text,
  onDelete,
}: {
  id: number;
  text: string;
  onDelete: (id: number) => void;
}) {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <li style={{ textDecoration: checked ? "line-through" : "none" }}>
        <input
          type="checkbox"
          checked={checked}
          style={{ display: "inline-block" }}
          onChange={() => {
            setChecked(!checked);
          }}
        />
        {text}
        <span>
          <button
            onClick={() => {
              onDelete(id);
            }}
          >
            X
          </button>
        </span>
      </li>
    </>
  );
}
