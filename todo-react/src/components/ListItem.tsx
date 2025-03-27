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
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <li style={{ textDecoration: isChecked ? "line-through" : "none" }}>
        <input
          className="checkbox"
          type="checkbox"
          checked={isChecked}
          style={{ display: "inline-block" }}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
        {text}
        <span>
          <button
            className="delete-btn"
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
