import { ListItemType } from "../types";
import { useEffect, useRef } from "react";

type Props = {
  handleClose: () => void;
  onSubmit: (item: ListItemType) => void;
};

export default function NewItemPopup({
  handleClose: onClose,
  onSubmit,
}: Props) {
  let userInput = "";
  const id = Math.floor(Math.random() * 1000);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmitClick = () => {
    const newItem: ListItemType = {
      id: id,
      todo: userInput,
      completed: false,
      userId: 0,
    };

    if (userInput) {
      onSubmit(newItem);
    }
    onClose();
  };

  return (
    <div id="popupWrapper">
      <div id="popupContent">
        <input
          id="add-new-input"
          ref={inputRef}
          type="text"
          onChange={(event) => {
            userInput = event.target.value;
          }}
        />
        <button id="ok" onClick={handleSubmitClick}>
          OK
        </button>
        <button id="cancel" onClick={onClose}>
          CANCEL
        </button>
        <button id="close" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
