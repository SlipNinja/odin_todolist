import todoPin from "./images/todo-pin.png";
import todoIcon from "./images/todo.png";
import folderIcon from "./images/folder.png";
import addIcon from "./images/add-todo.png";

const buildPage = (element) => {
    console.log("Website under construction...")

    const header = buildHeader();

    const content = buildContent("all");

    const footer = buildFooter();

    element.appendChild(header);
    element.appendChild(content);
    element.appendChild(footer);
};


function buildTodo(title) {
    const newTodo = document.createElement("div");
    newTodo.innerHTML = title;
    newTodo.classList.add("todo");

    return newTodo;
}


function buildHeader() {
    const header = document.createElement("div");
    header.id = "header";

    const logo = new Image();
    logo.src = todoPin;

    const title = document.createElement("div");
    title.id = "title";
    title.innerHTML = "UTL - Ultimate Todo List";

    const navigation = document.createElement("div");
    navigation.id = "navigation";

    const iconTodo = new Image();
    iconTodo.src = todoIcon;

    const todos = document.createElement("div");
    todos.classList.add("navItem");
    todos.innerHTML = "All todo's";
    todos.insertBefore(iconTodo, todos.firstChild);


    const iconFolder = new Image();
    iconFolder.src = folderIcon;

    const folders = document.createElement("div");
    folders.classList.add("navItem");
    folders.innerHTML = "All folders";
    folders.insertBefore(iconFolder, folders.firstChild);


    const iconAdd = new Image();
    iconAdd.src = addIcon;

    const addTodo = document.createElement("div");
    addTodo.classList.add("navItem");
    addTodo.innerHTML = "New item";
    addTodo.insertBefore(iconAdd, addTodo.firstChild);

    navigation.appendChild(todos);
    navigation.appendChild(folders);
    navigation.appendChild(addTodo);

    header.appendChild(logo);
    header.appendChild(title);
    header.appendChild(navigation);

    return header;
}

function buildContent(folder) {
    const content = document.createElement("div");
    content.id = "content";

    const todoList = document.createElement("div");
    todoList.id = "todolist";

    const displayTodo = document.createElement("div");
    displayTodo.id = "displaytodo";

    /*

    let all = (folder == "all");

    const keys = Object.keys(todosData);
    for(let i = 0; i < keys.length; i++){
        console.log(keys[i]);
        if(folder == keys[i] || all){
            console.log("JUSQU'ICI, TOUT VA BIEN");
        }
    }

    const todo1 = buildTodo("COUCOU");
    
    todoList.appendChild(todo1);
    */

    content.appendChild(todoList);
    content.appendChild(displayTodo);

    return content;
}

function buildFooter() {

    const footer = document.createElement("div");
    footer.id = "footer";

    const footerText = document.createElement("div");
    footerText.innerHTML = "Copyright @ Pedrolyto --- "

    const footerLink = document.createElement("a");
    footerLink.href = "https://www.flaticon.com/";
    footerLink.innerHTML = "Images from Flaticon";

    footer.appendChild(footerText);
    footer.appendChild(footerLink);

    return footer;
}


export default buildPage;