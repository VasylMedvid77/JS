import { useId, useState } from "react";
import { ResponseItem } from "../types";

type Props = {
  onClose: () => void;
  onSubmit: any;
};

export default function NewItemPopup({ onClose, onSubmit }: Props) {
  let userInput = "";
  const id = Math.floor(Math.random() * 1000);
  return (
    <div>
      <input
        type="text"
        name="Enter text"
        id=""
        onChange={(event) => {
          userInput = event.target.value;
        }}
      />
      <button
        onClick={() => {
          const newItem: ResponseItem = {
            id: id,
            todo: userInput,
            completed: false,
            userId: 0,
          };

          userInput && onSubmit(newItem);
          onClose();
        }}
      >
        OK
      </button>
      <button onClick={onClose}>CANCEL</button>
      <button onClick={onClose}>X</button>
    </div>
  );
}
