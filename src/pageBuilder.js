import todoPin from "./images/todo-pin.png";
import todoIcon from "./images/todo.png";
import folderIcon from "./images/folder.png";
import addIcon from "./images/add-todo.png";
import addFolderIcon from "./images/new-folder.png"

import {loadData, saveData, clearData, displayData, addFolder, addToFolder} from './storageHandler';
import { createDatalist } from "./helper";

const buildPage = (element) => {
    console.log("Website under construction...")

    const header = buildHeader();

    const content = buildContent();

    const footer = buildFooter();

    element.appendChild(header);
    element.appendChild(content);
    element.appendChild(footer);

    setDefaultDisplayMessage();
};


function addTodo(title, description, dueDuration, priority, dueDate, folder) {
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

    const realDate = document.createElement("div");
    realDate.classList.add("todoDate");
    
    const realFolder = document.createElement("div");
    realFolder.classList.add("todoFolder");

    realDate.classList.add("hidden");
    realFolder.classList.add("hidden");

    titleDisplay.innerHTML = title;
    descDisplay.innerHTML = description;
    dueDisplay.innerHTML = dueDuration;
    priorityDisplay.innerHTML = priority;
    realDate.innerHTML = dueDate;
    realFolder.innerHTML = folder;

    newTodo.appendChild(titleDisplay);
    newTodo.appendChild(descDisplay);
    newTodo.appendChild(dueDisplay);
    newTodo.appendChild(priorityDisplay);
    newTodo.appendChild(realDate);
    newTodo.appendChild(realFolder);

    newTodo.onclick = displayTodo;

    const todoList = document.getElementById("todolist");
    todoList.appendChild(newTodo);

    return newTodo;
}

function preparePopulate(e) {

    setDefaultDisplayMessage();

    let currentFolder = "all";
    if (typeof e !== 'undefined') {
        if(!e.srcElement.classList.contains('navItem')){
            let elem = e.srcElement;

            if(!elem.classList.contains("folder")){
                elem = elem.parentNode;
            }

            const fname = elem.querySelector(".fname");
            currentFolder = fname.innerHTML;
        }
    }

    const folderNav = document.getElementById("foldernavigation");
    folderNav.innerHTML = `Folder : ${currentFolder}`;
    
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
        let dueMilli = Date.parse(dataList[i]["dueDate"]) - new Date();
        let endMsg = "left";
        
        if(dueMilli < 0){
            dueMilli = Math.abs(dueMilli);
            endMsg = "ago";
        }
        
        let dueHours = Math.round(dueMilli / (1000 * 60 * 60));
        const dueDays = Math.trunc(dueHours / 24);
        let strDue = `${dueHours} hours ${endMsg}`;

        if(dueDays > 0){
            dueHours = dueHours - (dueDays * 24);
            strDue = `${dueDays} days and ${dueHours} hours ${endMsg}`;
        }

        
        const strPrio = `Priority : ${dataList[i]["priority"]}`;
        addTodo(dataList[i]["title"],
                dataList[i]["description"],
                strDue,
                strPrio,
                dataList[i]["dueDate"],
                dataList[i]["folder"],
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
    const tododate = src.querySelector('.todoDate');
    const todofolder = src.querySelector('.todoFolder');

    while (display.firstChild) {
        display.removeChild(display.lastChild);
    }

    const title = document.createElement("div");
    const desc = document.createElement("div");
    const due = document.createElement("div");
    const prio = document.createElement("div");
    const date = document.createElement("div");
    const folder = document.createElement("div");

    const dateData = new Date(Date.parse(tododate.innerHTML));
    const realDate = document.createElement("div");
    realDate.id = "displayRealDate";
    realDate.classList.add("hidden");
    realDate.innerHTML = tododate.innerHTML;

    const realFolder = document.createElement("div");
    realFolder.id = "displayRealFolder";
    realFolder.classList.add("hidden");
    realFolder.innerHTML = todofolder.innerHTML;

    title.id = "displaytitle";
    desc.id = "displaydesc";
    due.id = "displaydue";
    prio.id = "displayprio";
    date.id = "displaydate";
    folder.id = "displayfolder";

    title.innerHTML = todotitle.innerHTML;
    desc.innerHTML = tododesc.innerHTML;
    due.innerHTML = `Due : ${tododue.innerHTML}`;
    prio.innerHTML = todoprio.innerHTML.split(':')[1].trim();
    const readableDate = `Due date : ${dateData.getMonth()+1} - ${dateData.getDate()} - ${dateData.getFullYear()}`;
    date.innerHTML = readableDate;
    folder.innerHTML = `Folder : ${todofolder.innerHTML}`;

    display.appendChild(title);
    display.appendChild(desc);
    display.appendChild(prio);
    display.appendChild(date);
    display.appendChild(due);
    display.appendChild(folder);
    display.appendChild(realDate);
    display.appendChild(realFolder);

    const editBtn = document.createElement("button");
    editBtn.id = "editbtn";
    editBtn.innerHTML = "Edit";
    editBtn.onclick = editTodoForm;

    display.appendChild(editBtn);

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
    
    setDefaultDisplayMessage();

    const folderNav = document.getElementById("foldernavigation");
    folderNav.innerHTML = "Choose a folder";

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

function newTodoForm(e) {

    const display = document.getElementById("displaytodo");

    while (display.firstChild) {
        display.removeChild(display.lastChild);
    }

    const form = createTodoForm();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTodoName = document.getElementById("todoformname").value;
        const newTodoDesc = document.getElementById("todoformdesc").value;
        const newTodoDate = document.getElementById("todoformdate").value;
        const newTodoPrio = document.getElementById("todoformprio").value;
        const newTodoFolder = document.getElementById("todoformfolder").value;

        let data = loadData();
        if(!(Object.keys(data).includes(newTodoFolder))) {
            data = addFolder(data, newTodoFolder);
        }

        data = addToFolder(data, newTodoFolder, newTodoName, newTodoDesc, newTodoDate, newTodoPrio);
        saveData(data);

        populateFolders();
        setDefaultDisplayMessage();
    });

    display.appendChild(form);
}

function editTodoForm(e) {
    const display = document.getElementById("displaytodo");
    const src = e.srcElement;

    const baseTitle = display.querySelector("#displaytitle").innerHTML;
    const baseDesc = display.querySelector("#displaydesc").innerHTML;
    const baseDate = display.querySelector("#displayRealDate").innerHTML;
    
    const d = new Date(new Date(baseDate).toDateString());
    d.setDate(d.getDate()+1);
    d.setHours(0);
    d.setMinutes(0);
    console.log(baseDate);
    console.log(d);

    const basePrio = display.querySelector("#displayprio").innerHTML;
    const baseFolder = display.querySelector("#displayRealFolder").innerHTML;
    const name = display.querySelector("#displaytitle").innerHTML;

    while (display.firstChild) {
        display.removeChild(display.lastChild);
    }

    const form = createTodoForm();
    display.appendChild(form);

    //Disable name field
    const titleElem = form.querySelector("#todoformname");
    const descElem = form.querySelector("#todoformdesc");
    const dateElem = form.querySelector("#todoformdate");
    const prioElem = form.querySelector("#todoformprio");
    const folderElem = form.querySelector("#todoformfolder");
    const btnElem = form.querySelector("#btnsubmit");

    titleElem.disabled = true;
    titleElem.value = baseTitle;
    descElem.value = baseDesc;
    dateElem.valueAsDate = d;
    prioElem.value = basePrio;
    folderElem.value = baseFolder;

    btnElem.innerHTML = "Apply changes";

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTodoName = document.getElementById("todoformname").value;
        const newTodoDesc = document.getElementById("todoformdesc").value;
        const newTodoDate = document.getElementById("todoformdate").value;
        const newTodoPrio = document.getElementById("todoformprio").value;
        const newTodoFolder = document.getElementById("todoformfolder").value;

        let data = loadData();

        // Delete previous !
        loop:
        for(let folder in data){
            for (const todo in data[folder]) {
                if(data[folder][todo].title == name) {
                    data[folder].splice(todo, 1);
                    break loop;
                }
            }
        }

        if(!(Object.keys(data).includes(newTodoFolder))) {
            data = addFolder(data, newTodoFolder);
        }

        data = addToFolder(data, newTodoFolder, newTodoName, newTodoDesc, newTodoDate, newTodoPrio);
        saveData(data);

        let dataDisplay = [];
        for(let folder in data){
            if(folder == newTodoFolder){
                dataDisplay.push.apply(dataDisplay, data[folder]);
            }
        }

        const folderNav = document.getElementById("foldernavigation");
        folderNav.innerHTML = `Folder : ${newTodoFolder}`;

        populateList(dataDisplay);
        setDefaultDisplayMessage();
    });
}

function createTodoForm() {
    const todoForm = document.createElement("form");
    todoForm.id = "todoForm";

    const nameLabel = document.createElement("label");
    nameLabel.htmlFor = "todoformname";
    nameLabel.innerHTML = "Name";

    const nameInput = document.createElement("input");
    nameInput.id = "todoformname";
    nameInput.type = "text";
    nameInput.required = true;
    nameInput.name = "name";
    nameInput.placeholder = "To do...";

    const descLabel = document.createElement("label");
    descLabel.htmlFor = "todoformdesc";
    descLabel.innerHTML = "Description";

    const descInput = document.createElement("input");
    descInput.id = "todoformdesc";
    descInput.type = "text";
    descInput.required = true;
    descInput.name = "desc";
    descInput.placeholder = "Details...";

    const dateLabel = document.createElement("label");
    dateLabel.htmlFor = "todoformdate";
    dateLabel.innerHTML = "Due date";

    const dateInput = document.createElement("input");
    dateInput.id = "todoformdate";
    dateInput.type = "date";
    dateInput.required = true;
    dateInput.name = "date";
    dateInput.placeholder = "When its due...";

    const prioLabel = document.createElement("label");
    prioLabel.htmlFor = "todoformprio";
    prioLabel.innerHTML = "Priority";

    const prioInput = document.createElement("input");
    prioInput.id = "todoformprio";
    prioInput.setAttribute("list","priority");
    prioInput.required = true;
    prioInput.name = "prio";
    prioInput.placeholder = "Select a priority...";

    const priolist = ["low", "medium", "high"];
    const choices = createDatalist(priolist);
    choices.id = "priority";

    const folderLabel = document.createElement("label");
    folderLabel.htmlFor = "todoformfolder";
    folderLabel.innerHTML = "Folder";

    const folderInput = document.createElement("input");
    folderInput.id = "todoformfolder";
    folderInput.setAttribute("list","folders");
    folderInput.required = true;
    folderInput.name = "fold";
    folderInput.placeholder = "Select a folder...";

    
    const data = loadData();
    const folders = createDatalist(Object.keys(data));
    folders.id = "folders";

    const btnSubmit = document.createElement("button");
    btnSubmit.id = "btnsubmit";
    btnSubmit.type = "submit";
    btnSubmit.value = "Submit";
    btnSubmit.innerHTML = "Add Todo";

    todoForm.appendChild(nameLabel);
    todoForm.appendChild(nameInput);
    todoForm.appendChild(descLabel);
    todoForm.appendChild(descInput);
    todoForm.appendChild(dateLabel);
    todoForm.appendChild(dateInput);
    todoForm.appendChild(prioLabel);
    todoForm.appendChild(prioInput);
    todoForm.appendChild(choices);
    todoForm.appendChild(folderLabel);
    todoForm.appendChild(folderInput);
    todoForm.appendChild(folders);
    todoForm.appendChild(btnSubmit);

    return todoForm;
}

function newFolderForm(e) {
    const display = document.getElementById("displaytodo");

    while (display.firstChild) {
        display.removeChild(display.lastChild);
    }

    const folderForm = document.createElement("form");
    folderForm.id = "folderForm";

    const nameLabel = document.createElement("label");
    nameLabel.htmlFor = "folderformname";
    nameLabel.innerHTML = "Name";

    const nameInput = document.createElement("input");
    nameInput.id = "folderformname";
    nameInput.type = "text";
    nameInput.required = true;
    nameInput.name = "name";
    nameInput.placeholder = "A good folder name...";

    const btnSubmit = document.createElement("button");
    btnSubmit.type = "submit";
    btnSubmit.value = "Submit";
    btnSubmit.innerHTML = "Add folder";

    folderForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newFolderName = document.getElementById("folderformname");
        let data = loadData();
        data = addFolder(data, newFolderName.value);
        saveData(data);

        populateFolders();
        setDefaultDisplayMessage();
    });

    folderForm.appendChild(nameLabel);
    folderForm.appendChild(nameInput);
    folderForm.appendChild(btnSubmit);

    display.appendChild(folderForm);

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
    addTodo.innerHTML = "New todo";
    addTodo.insertBefore(iconAdd, addTodo.firstChild);
    addTodo.onclick = newTodoForm;

    const iconAddFolder = new Image();
    iconAddFolder.src = addFolderIcon;

    const addFolder = document.createElement("div");
    addFolder.classList.add("navItem");
    addFolder.innerHTML = "New folder";
    addFolder.insertBefore(iconAddFolder, addFolder.firstChild);
    addFolder.onclick = newFolderForm;

    navigation.appendChild(todos);
    navigation.appendChild(addTodo);
    navigation.appendChild(folders);
    navigation.appendChild(addFolder);

    header.appendChild(logo);
    header.appendChild(title);
    header.appendChild(navigation);

    return header;
}

function buildContent() {
    const content = document.createElement("div");
    content.id = "content";

    const leftContent = document.createElement("div");
    leftContent.id = "leftcontent";

    const folderNav = document.createElement("div");
    folderNav.id = "foldernavigation";
    folderNav.innerHTML = "Folder : all";

    const todoList = document.createElement("div");
    todoList.id = "todolist";

    const displayTodo = document.createElement("div");
    displayTodo.id = "displaytodo";

    leftContent.appendChild(folderNav);
    leftContent.appendChild(todoList);

    content.appendChild(leftContent);
    content.appendChild(displayTodo);

    return content;
}

function setDefaultDisplayMessage() {
    const list = document.getElementById("displaytodo");
    
    while (list.firstChild) {
        list.removeChild(list.lastChild);
    }
    
    const msg = document.createElement("div");
    msg.id = "displaymessage";
    msg.innerHTML = "Click on a Todo to display its details !";

    list.appendChild(msg);
}

function buildFooter() {

    const footer = document.createElement("div");
    footer.id = "footer";

    const footerText = document.createElement("div");
    footerText.innerHTML = "Copyright @ Pedrolyto&nbsp-&nbsp"

    const footerLink = document.createElement("a");
    footerLink.href = "https://www.flaticon.com/";
    footerLink.innerHTML = "Images from Flaticon";

    footer.appendChild(footerText);
    footer.appendChild(footerLink);

    return footer;
}


export { buildPage, preparePopulate};