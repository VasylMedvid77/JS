const URL = "https://dummyjson.com/todos";

class Page {
  constructor() {
    this.list = [];
    this.addNewButton = document.getElementById("addNew");
    this.htmlList = document.getElementById("myList");
  }

  async fetchData() {
    const request = await fetch(URL);
    return await request.json();
  }

  async init() {
    const data = await this.fetchData();
    for (let item of data["todos"]) {
      this.list.push(new ListItem(item));
    }
    this.render();
    this.formHandler();
    this.deleteHandler();
    this.checkmarkHandler();
  }

  addToDOMlist(item) {
    // "item" is html element ready to be appended to body
    this.htmlList.append(item);
  }

  checkmarkHandler() {
    document.addEventListener("click", (event) => {
      const clickedElement = event.target;
      if (clickedElement.className == "checkmark") {
        event.stopPropagation();

        const checked = JSON.parse(clickedElement.getAttribute("checked"));
        console.log("Checked" + checked);
        const htmlId = clickedElement.parentElement.id;
        const itemIndex = this.list.findIndex((item) => item.id == htmlId);
        // to preserve state after new render
        this.list[itemIndex].status = !checked;
        clickedElement.setAttribute("checked", `${!checked}`);
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
    document.addEventListener("mouseover", (event) => {
      event.stopPropagation();
      const hoveredElement = event.target;
      // if hovered item is delete button then second handler created
      if (hoveredElement.className == "delete-btn") {
        // deleted button created as child element of li list item
        // having access to parent li we have ability to delete it from DOM
        // as well as find item by id in general list and delete it from there
        // potentially here we also can do POST request to backend to delete item by id thru API

        hoveredElement.addEventListener("click", () => {
          // html id is the id of LI element. Every LI element have id from fetched data from BE
          const htmlId = hoveredElement.parentElement.id;
          const itemIndex = this.list.findIndex((item) => item.id == htmlId);
          console.log(`Deleted item: ${this.list[itemIndex].text}`);

          //delete item class instance from array storage
          this.list.splice(itemIndex, 1);

          //delete item from dom
          hoveredElement.parentElement.remove();
        });
      }
    });
  }

  render() {
    console.log("rendering");
    this.htmlList.replaceChildren();
    for (const item of this.list) {
      this.addToDOMlist(item.html);
    }
  }
}
class ListItem {
  constructor(item) {
    this.text = item["todo"];
    this.id = item["id"] || Math.floor(Math.random() * 1000);
    this.status = item["completed"] || false;
    this.deleteButton = document.createElement("button");
    this.deleteButton.className = "delete-btn";
    this.checkmark = document.createElement("div");
    this.checkmark.className = "checkmark";
    this.checkmark.setAttribute("checked", item["completed"]);
    this.html = this.html();
  }

  html() {
    const Item = document.createElement("li");
    Item.textContent = this.text;
    Item.id = this.id;
    Item.setAttribute("completed", this.status);
    Item.append(this.deleteButton);
    Item.append(this.checkmark);
    return Item;
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
    console.log("form hidden");
    this.popupWrapper.style.display = "none";
    this.input.value = "";
  }

  makeVisible() {
    console.log("form visible");
    this.popupWrapper.style.display = "flex";
  }
}

const page = new Page();
page.init();
