import { useState } from "react";

export default function ListItem(props: any) {
  const text = props.text;
  const id = props.id;
  const [textDecoration, markDone] = useState("none");
  const style = { textDecoration: textDecoration };
  function handleClick() {
    console.log("clicked");
    markDone(textDecoration === "none" ? "line-through" : "none");
  }
  return (
    <li data-completed="false" id={id} style={style}>
      {text}
      <button className="delete-btn" onClick={handleClick}>
        X
      </button>
      <div className="checkmark" data-checked="false"></div>
    </li>
  );
}
