import "./App.css";

function App() {
  return (
    <>
      <head>
        <title>TODO-LIST</title>
      </head>
      <body>
        <section id="top-header">
          <h1>TODO LIST</h1>
          <input type="checkbox" id="showcompleted" />
          <label htmlFor="showcompleted">show completed</label>
        </section>

        <section>
          <ol id="myList"></ol>
        </section>
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
                <button id="ok">OK</button>
                <button id="cancel">CANCEL</button>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <button id="addNew">Add new</button>
        </footer>
      </body>
    </>
  );
}

export default App;
