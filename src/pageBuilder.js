import todoPin from "./images/todo-pin.png";
import todoIcon from "./images/todo.png";
import folderIcon from "./images/folder.png";
import addIcon from "./images/add-todo.png";

import {loadData, saveData, clearData, displayData, addFolder, addToFolder} from './storageHandler';


const buildPage = (element) => {
    console.log("Website under construction...")

    const header = buildHeader();

    const content = buildContent();

    const footer = buildFooter();

    element.appendChild(header);
    element.appendChild(content);
    element.appendChild(footer);
};


function addTodo(title, description, dueDate, priority) {
    const newTodo = document.createElement("div");
    newTodo.classList.add("todo");

    const titleDisplay = document.createElement("div");
    titleDisplay.classList.add("todoTitle");
    
    const descDisplay = document.createElement("div");
    descDisplay.classList.add("todoDescription");
    
    const dueDisplay = document.createElement("div");
    dueDisplay.classList.add("todoDue");
    
    const priorityDisplay = document.createElement("div");
    priorityDisplay.classList.add("todoPriority");

    titleDisplay.innerHTML = title;
    descDisplay.innerHTML = description;
    dueDisplay.innerHTML = dueDate;
    priorityDisplay.innerHTML = priority;

    newTodo.appendChild(titleDisplay);
    newTodo.appendChild(descDisplay);
    newTodo.appendChild(dueDisplay);
    newTodo.appendChild(priorityDisplay);

    newTodo.onclick = displayTodo;

    const todoList = document.getElementById("todolist");
    todoList.appendChild(newTodo);

    return newTodo;
}

function preparePopulate(e) {

    let currentFolder = "all";

    if (typeof e !== 'undefined') {
        if(!e.srcElement.classList.contains('navItem')){
            const elem = e.srcElement;
            currentFolder = elem.querySelector(".fname").innerHTML;
        }
    }
    
    const data = loadData();
    let dataDisplay = [];
    for(let folder in data){
        // filter folder later
        if(currentFolder == "all" || currentFolder == folder){
            dataDisplay.push.apply(dataDisplay, data[folder]);
        }
    }

    populateList(dataDisplay);
}

const populateList = (dataList) => {
    const todoList = document.getElementById("todolist");
    
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }

    for(let i in dataList){
        const due = Math.trunc((Date.parse(dataList[i]["dueDate"]) - new Date()) / 86400000);
        const strDue = `${due} days left`;
        const strPrio = `Priority : ${dataList[i]["priority"]}`;
        addTodo(dataList[i]["title"],
                dataList[i]["description"],
                strDue,
                strPrio,
        );
    }
}

function displayTodo(e) {

    const display = document.getElementById("displaytodo");
    let src = e.srcElement;

    // If we don't click directly on parent
    if (!src.classList.contains("todo")) {
        src = src.parentNode;
    }

    setCurrent(src);

    const todotitle = src.querySelector('.todoTitle');
    const tododesc = src.querySelector('.todoDescription');
    const tododue = src.querySelector('.todoDue');
    const todoprio = src.querySelector('.todoPriority');

    while (display.firstChild) {
        display.removeChild(display.lastChild);
    }

    const title = document.createElement("div");
    const desc = document.createElement("div");
    const due = document.createElement("div");
    const prio = document.createElement("div");

    title.innerHTML = todotitle.innerHTML;
    desc.innerHTML = tododesc.innerHTML;
    due.innerHTML = tododue.innerHTML;
    prio.innerHTML = todoprio.innerHTML;

    display.appendChild(title);
    display.appendChild(desc);
    display.appendChild(due);
    display.appendChild(prio);
}

function setCurrent(todo) {

    const todolist = document.getElementById("todolist");
    const current = todolist.querySelector(".current");

    if(current){
        current.classList.remove("current");
        const curTitle = current.querySelector(".todoTitle");
        curTitle.classList.remove("current");
    }

    todo.classList.add("current");
    const todotitle = todo.querySelector('.todoTitle');
    todotitle.classList.add("current");
}

function populateFolders(e) {

    const todoList = document.getElementById("todolist");
    
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
    
    const data = loadData();

    let dataDisplay = [];
    for(let folder in data){
        const f = createFolder(folder, data[folder].length);
        todoList.appendChild(f);
    }
}

function createFolder(name, todoNumber) {
    const newFolder = document.createElement("div");
    newFolder.classList.add("folder");
    newFolder.onclick = preparePopulate;

    const fName = document.createElement("div");
    fName.innerHTML = name;
    fName.classList.add("fname");

    const fNumber = document.createElement("div");
    fNumber.innerHTML = ` ${todoNumber} todo's`;

    newFolder.appendChild(fName);
    newFolder.appendChild(fNumber);

    return newFolder;
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
    todos.onclick = preparePopulate;

    const iconFolder = new Image();
    iconFolder.src = folderIcon;

    const folders = document.createElement("div");
    folders.classList.add("navItem");
    folders.innerHTML = "All folders";
    folders.insertBefore(iconFolder, folders.firstChild);
    folders.onclick = populateFolders;

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

function buildContent() {
    const content = document.createElement("div");
    content.id = "content";

    const todoList = document.createElement("div");
    todoList.id = "todolist";

    const displayTodo = document.createElement("div");
    displayTodo.id = "displaytodo";

    const msg = document.createElement("div");
    msg.id = "displaymessage";
    msg.innerHTML = "Click on a Todo to display its details !";

    displayTodo.appendChild(msg);

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


export { buildPage, preparePopulate};