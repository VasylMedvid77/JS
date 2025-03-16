export default function AddNewPopup() {
  function onC() {
    console.log("clicked");
  }
  return (
    <section>
      <div id="popupWrapper">
        <div id="popupContent">
          <button id="close"></button>
          <div id="addNewForm">
            <textarea
              id="textInput"
              rows={4}
              cols={50}
              placeholder="Enter your text here..."
            ></textarea>
            <button onClick={onC} id="ok">
              OK
            </button>
            <button id="cancel">CANCEL</button>
          </div>
        </div>
      </div>
    </section>
  );
}
