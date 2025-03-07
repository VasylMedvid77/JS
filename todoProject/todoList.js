const remoteURL = "https://dummyjson.com/todos";

class Page {
  constructor() {
    this.list = [];
    this.addNewButton = document.getElementById("addNew");
    this.htmlList = document.getElementById("myList");
  }

  async fetchData() {
    const request = await fetch(remoteURL);
    return await request.json();
  }

  async init() {
    const data = await this.fetchData();
    data.todos.forEach((item) => {
      this.list.push(new ListItem(item));
    });
    this.render();
    this.formHandler();
    this.deleteHandler();
    this.checkmarkHandler();
    this.toggleCompletedHandler();
  }

  addToDOMlist(item) {
    // "item" is html element ready to be appended to body
    this.htmlList.append(item);
  }

  checkmarkHandler() {
    document.addEventListener("click", (event) => {
      const clickedElement = event.target;
      if (clickedElement.className === "checkmark") {
        const checked = JSON.parse(clickedElement.getAttribute("data-checked"));
        const htmlId = clickedElement.parentElement.id;
        const itemIndex = this.list.findIndex(
          (item) => item.id === Number(htmlId)
        );
        // to preserve state after new render
        this.list[itemIndex].status = !checked;
        clickedElement.setAttribute("data-checked", `${!checked}`);
        clickedElement.parentElement.setAttribute("completed", `${!checked}`);
      }
    });
  }

  formHandler() {
    const form = new Form();
    this.addNewButton.addEventListener("click", () => form.makeVisible());
    form.cancelButton.addEventListener("click", () => form.makeHidden());
    form.closeButton.addEventListener("click", () => form.makeHidden());

    form.okButton.addEventListener("click", () => {
      if (form.input.value) {
        this.list.push(new ListItem({ todo: form.input.value }));
        form.makeHidden();
        this.render();
      }
    });
  }

  deleteHandler() {
    // first handler checks hover
    document.getElementById("myList").addEventListener("click", (event) => {
      const clickedOn = event.target;
      if (clickedOn.className === "delete-btn") {
        console.log("deleted");
        const htmlId = clickedOn.parentElement.id;
        const itemIndex = this.list.findIndex((item) => item.id === htmlId);
        this.list.splice(itemIndex, 1);
        clickedOn.parentElement.remove();
      }
    });
  }

  toggleCompletedHandler() {
    document.getElementById("top-header").addEventListener("click", (event) => {
      const clickedOn = event.target;
      if (clickedOn.id === "showcompleted") {
        if (!clickedOn.checked) {
          document.documentElement.style.setProperty(
            "--show-completed",
            "none"
          );
        } else {
          document.documentElement.style.setProperty(
            "--show-completed",
            "flex"
          );
        }
      }
    });
  }

  render() {
    this.htmlList.replaceChildren();
    this.list.forEach((item) => this.addToDOMlist(item.html));
  }
}
class ListItem {
  static #pool = Array.from(ListItem.#randomIdSet());

  constructor(item) {
    this.text = item.todo;
    this.id = item.id || ListItem.#pool.pop();
    this.status = item.completed || false;
    this.html = this.#generateHtml();
  }

  #generateHtml() {
    const Item = ListItem.#createElem("li", {
      completed: this.status,
      id: this.id,
    });
    Item.textContent = this.text;
    const deleteButton = ListItem.#createElem("button", {
      class: "delete-btn",
    });
    const checkmarkDiv = ListItem.#createElem("div", {
      class: "checkmark",
      "data-checked": this.status,
    });
    Item.append(deleteButton, checkmarkDiv);
    return Item;
  }

  static #createElem(type, ...args) {
    const elem = document.createElement(type);
    if (args.length) {
      Object.entries(args[0]).forEach(([attribute, value]) => {
        elem.setAttribute(attribute, value);
      });
    }
    return elem;
  }

  static #randomIdSet() {
    const randomSet = new Set();
    do {
      const id = Math.floor(Math.random() * 1000);
      randomSet.add(id);
    } while (randomSet.size < 1000);
    return randomSet;
  }
}
class Form {
  constructor() {
    this.popupWrapper = document.getElementById("popupWrapper");
    this.okButton = document.getElementById("ok");
    this.input = document.getElementById("textInput");
    this.cancelButton = document.getElementById("cancel");
    this.closeButton = document.getElementById("close");
  }

  makeHidden() {
    this.popupWrapper.style.display = "none";
    this.input.value = "";
  }

  makeVisible() {
    this.popupWrapper.style.display = "flex";
  }
}

const page = new Page();
page.init();
