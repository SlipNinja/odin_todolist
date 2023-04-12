/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildPage": () => (/* binding */ buildPage),
/* harmony export */   "preparePopulate": () => (/* binding */ preparePopulate)
/* harmony export */ });
/* harmony import */ var _images_todo_pin_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _images_todo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _images_folder_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _images_add_todo_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _images_new_folder_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _storageHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);









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

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.onclick = deleteTodo;

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
    newTodo.appendChild(delBtn);

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
    
    const data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.loadData)();
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
    prio.innerHTML = todoprio.innerHTML;
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
        const curBtn = current.getElementsByTagName("button")[0];
        curBtn.classList.remove("current");
    }

    todo.classList.add("current");
    const todotitle = todo.querySelector('.todoTitle');
    todotitle.classList.add("current");
    const todobutton = todo.getElementsByTagName("button")[0];
    todobutton.classList.add("current");
}

function populateFolders(e) {

    const todoList = document.getElementById("todolist");
    
    setDefaultDisplayMessage();

    const folderNav = document.getElementById("foldernavigation");
    folderNav.innerHTML = "Choose a folder";

    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
    
    const data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.loadData)();

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

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "Delete";
    delBtn.onclick = deleteFolder;

    newFolder.appendChild(fName);
    newFolder.appendChild(fNumber);
    newFolder.appendChild(delBtn);

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

        let data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.loadData)();
        if(!(Object.keys(data).includes(newTodoFolder))) {
            data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.addFolder)(data, newTodoFolder);
        }

        data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.addToFolder)(data, newTodoFolder, newTodoName, newTodoDesc, newTodoDate, newTodoPrio);
        (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.saveData)(data);

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

    const basePrio = display.querySelector("#displayprio").innerHTML.split(':')[1].trim();
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

        let data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.loadData)();
        data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.removeTodo)(data, name);

        if(!(Object.keys(data).includes(newTodoFolder))) {
            data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.addFolder)(data, newTodoFolder);
        }

        data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.addToFolder)(data, newTodoFolder, newTodoName, newTodoDesc, newTodoDate, newTodoPrio);
        (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.saveData)(data);

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
    const choices = (0,_helper__WEBPACK_IMPORTED_MODULE_6__.createDatalist)(priolist);
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

    
    const data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.loadData)();
    const folders = (0,_helper__WEBPACK_IMPORTED_MODULE_6__.createDatalist)(Object.keys(data));
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
        let data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.loadData)();
        data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.addFolder)(data, newFolderName.value);
        (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.saveData)(data);

        populateFolders();
        setDefaultDisplayMessage();
    });

    folderForm.appendChild(nameLabel);
    folderForm.appendChild(nameInput);
    folderForm.appendChild(btnSubmit);

    display.appendChild(folderForm);

}

function deleteTodo(e) {
    const message = "Are you sure you want to delete this todo ?";
    if(!confirm(message)){
        return;
    }

    const name = e.srcElement.parentNode.querySelector(".todoTitle").innerHTML;
    let data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.loadData)();
    data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.removeTodo)(data, name);
    (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.saveData)(data);

    preparePopulate();
}

function deleteFolder(e) {
    const message = "Are you sure you want to delete this folder ? Every todo inside will be destroyed.";
    if(!confirm(message)){
        return;
    }

    const folder = e.srcElement.parentNode.querySelector(".fname").innerHTML;
    let data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.loadData)();
    data = (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.removeFolder)(data, folder);
    (0,_storageHandler__WEBPACK_IMPORTED_MODULE_5__.saveData)(data);

    populateFolders();
    e.stopPropagation();
}

function buildHeader() {
    const header = document.createElement("div");
    header.id = "header";

    const logo = new Image();
    logo.src = _images_todo_pin_png__WEBPACK_IMPORTED_MODULE_0__;

    const title = document.createElement("div");
    title.id = "title";
    title.innerHTML = "UTL - Ultimate Todo List";

    const navigation = document.createElement("div");
    navigation.id = "navigation";

    const iconTodo = new Image();
    iconTodo.src = _images_todo_png__WEBPACK_IMPORTED_MODULE_1__;

    const todos = document.createElement("div");
    todos.classList.add("navItem");
    todos.innerHTML = "All todo's";
    todos.insertBefore(iconTodo, todos.firstChild);
    todos.onclick = preparePopulate;

    const iconFolder = new Image();
    iconFolder.src = _images_folder_png__WEBPACK_IMPORTED_MODULE_2__;

    const folders = document.createElement("div");
    folders.classList.add("navItem");
    folders.innerHTML = "All folders";
    folders.insertBefore(iconFolder, folders.firstChild);
    folders.onclick = populateFolders;

    const iconAdd = new Image();
    iconAdd.src = _images_add_todo_png__WEBPACK_IMPORTED_MODULE_3__;

    const addTodo = document.createElement("div");
    addTodo.classList.add("navItem");
    addTodo.innerHTML = "New todo";
    addTodo.insertBefore(iconAdd, addTodo.firstChild);
    addTodo.onclick = newTodoForm;

    const iconAddFolder = new Image();
    iconAddFolder.src = _images_new_folder_png__WEBPACK_IMPORTED_MODULE_4__;

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




/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "54a842fa6e4f189f9fef.png";

/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ed7b1c334a2d2a8073db.png";

/***/ }),
/* 4 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "102aa58f273e9de72654.png";

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e6ea72cd808c0424e7a8.png";

/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "dc9068697582cd313362.png";

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addFolder": () => (/* binding */ addFolder),
/* harmony export */   "addToFolder": () => (/* binding */ addToFolder),
/* harmony export */   "clearData": () => (/* binding */ clearData),
/* harmony export */   "displayData": () => (/* binding */ displayData),
/* harmony export */   "loadData": () => (/* binding */ loadData),
/* harmony export */   "removeFolder": () => (/* binding */ removeFolder),
/* harmony export */   "removeTodo": () => (/* binding */ removeTodo),
/* harmony export */   "saveData": () => (/* binding */ saveData)
/* harmony export */ });


const loadData = () => {
    console.log("Loading data...")

    const dataLoad = localStorage.getItem("tododata");

    if(JSON.parse(dataLoad) == null){
        return {};
    }

    return JSON.parse(dataLoad);
};

const addFolder = (data, folder) => {
    if(data == null){
        data = {};
    }

    if(folder in data){
        console.log(`Folder ${folder} already exists`);
        return;
    }

    data[folder] = [];

    return data;
};

const addToFolder = (data, folder, title, description, dueDate, priority) => {
    if(!(folder in data)){
        console.log(`Folder ${folder} doesn't exist, can't create todo`);
        return;
    }

    let todo = {
        "title": title,
        "description" : description,
        "dueDate": dueDate,
        "priority": priority,
        "folder": folder,
    };

    data[folder].push(todo);

    return data;
};

function removeTodo(data, name){
    loop:
        for(let folder in data){
            for (const todo in data[folder]) {
                if(data[folder][todo].title == name) {
                    data[folder].splice(todo, 1);
                    break loop;
                }
            }
        }

    return data;
}

function removeFolder(data, folder) {
    delete data[folder];
    return data;
}

const displayData = (data) => {
    console.log(data);
};

const saveData = (data) => {
    localStorage.setItem("tododata", JSON.stringify(data));
}

const clearData = () => {
    localStorage.clear();
}



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDatalist": () => (/* binding */ createDatalist)
/* harmony export */ });


function createDatalist(list) {
    const choices = document.createElement("datalist");

    list.forEach(choice => {
        const choiceElement = document.createElement("option");
        choiceElement.value = choice;
        choices.appendChild(choiceElement);
    });

    return choices;
}



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 10 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 11 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 12 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 13 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 14 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 15 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 16 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(20), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(21), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(22), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    padding: 0;\n}\n\n@font-face {\n    font-family: 'chocolate';\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n@font-face {\n    font-family: 'walking';\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n@font-face {\n    font-family: 'quesmo';\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n}\n\nbody {\n    font-family: 'quesmo';\n}\n\n\n\n#pageContent {\n    display: grid;\n    min-height: 100vh;\n    width: 100vw;\n    grid-template-rows: 220px 1fr 50px;\n}\n\n/* HEADER */\n\n#header {\n    background-color: rgb(30, 40, 60);\n    display: grid;\n\n    grid-template-columns: 1fr 3fr;\n    grid-template-rows: 2fr 1fr;\n}\n\n#header img {\n    filter: invert();\n    width: 180px;\n    grid-row: span 2;\n    align-self: center;\n    justify-self: center;\n}\n\n#title {\n    align-self: center;\n    justify-self: center;\n    font-size: 50px;\n    color: whitesmoke;\n}\n\n#navigation {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    font-size: 25px;\n    gap: 3vw;\n}\n\n.navItem {\n    flex: 1;\n    color: whitesmoke;\n    border: solid rgb(60, 80, 120) 2px;\n    border-radius: 10px;\n    box-shadow: 0px 0px 3px whitesmoke;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n    padding: 10px 0px 10px 0px;\n    max-width: 200px;\n    margin-bottom: 20px;\n}\n\n.navItem:hover {\n    box-shadow: 0px 0px 8px whitesmoke;\n    cursor: grab;\n}\n\n.navItem:active {\n    background-color: rgb(60, 80, 120);\n}\n\n.navItem img {\n    max-width: 15%;\n}\n\n\n/* CONTENT */\n\n#content {\n    background-color: whitesmoke;\n    display: flex;\n}\n\n#leftcontent {\n    flex: 3 2 auto;\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    font-family: 'walking';\n}\n\n#foldernavigation {\n    flex: 1;\n    display: flex;\n    align-items: center;\n    padding-left: 30px;\n    font-size: 40px;\n}\n\n#todolist {\n    flex: 9;\n    background-color: whitesmoke;\n    padding: 10px 0px 10px 0px;\n    display: grid;\n\n    grid-template-columns: repeat(auto-fill, 230px);\n    grid-template-rows: repeat(auto-fill, 260px);\n\n    grid-auto-rows: 260px;\n    justify-content: center;\n\n    gap: 10px;\n    width: 100%;\n}\n\n.todo {\n    border-radius: 10px;\n    background-color: rgb(178, 211, 118);\n    box-shadow: 3px 3px 8px rgb(30, 40, 60);\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n}\n\n.todo * {\n    font-size: 25px;\n    flex: 1;\n    display:flex;\n    flex-direction:column;\n    justify-content:space-around;\n    margin: 5px;\n    font-family: 'walking';\n}\n\n.todo button {\n    text-align: center;\n    background-color: rgb(175, 194, 66);\n    border-radius: 4px;\n    width: 50%;\n    align-self: center;\n    align-items: center;\n}\n\n.todo button:hover {\n    background-color: rgb(135, 150, 45);\n}\n\n.todo button:active {\n    background-color: rgb(90, 100, 35);\n}\n\n.todoTitle {\n    border-radius: 8px 8px 0 0;\n    flex: 2;\n    background-color: rgb(175, 194, 66);\n    margin: 0;\n    text-align: center;\n    border-bottom: solid rgb(100, 150, 20) 1px;    \n}\n\n.todoDescription {\n    display: inline-block;\n    text-overflow: ellipsis;\n    overflow:hidden;\n    white-space: nowrap;\n    padding-top: 5px;\n}\n\n.todo:hover{\n    box-shadow: 6px 6px 12px rgb(30, 40, 60);\n    cursor: grab;\n}\n\n.todo:active, .todo:active .todoTitle {\n    background-color: rgb(30, 40, 60);\n    color: whitesmoke;\n}\n\n.current {\n    background-color: rgb(30, 40, 60);\n    color: whitesmoke;\n}\n\n.current button {\n    background-color: rgb(60, 75, 10);\n}\n\n.current button:hover {\n    color: black;\n}\n\n#displaytodo {\n    background-color: rgb(20, 35, 40);\n    box-shadow: 3px 3px 8px rgb(20, 35, 40);\n    flex: 2 1 auto;\n    height: 90%;\n    max-height: 60vh;\n    width: 600px;\n    align-self: top;\n    margin-right: 2%;\n    margin-left: 2%;\n    margin-top: 4vh;\n    color: whitesmoke;\n    font-family: 'walking';\n    font-size: 30px;\n    padding: 10px;\n\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n}\n\n#displaytodo button {\n    width: 150px;\n    height: 50px;\n    font-size: 30px;\n    font-family: 'walking';\n    align-self: center;\n    background-color: rgb(100, 180, 200);\n    border-radius: 5px;\n    border: none;\n}\n\n#displaytodo button:hover {\n    background-color: rgb(50, 90, 100);\n}\n\n#displaytodo button:active {\n    background-color: rgb(20, 35, 40);\n}\n\n#displaymessage {\n    margin-top: 40%;\n    text-align: center;\n}\n\n#folderForm, #todoForm {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n\n#folderForm input, #todoForm input{\n    height: 30px;\n    align-self: center;\n    width: 90%;\n    font-size: 18px;\n}\n\n#folderForm button, #todoForm button{\n    height: 40px;\n    width: 50%;\n    align-self: center;\n    margin-top: 20px;\n    font-family: 'walking';\n    font-size: 30px;\n}\n\n.folder {\n    background-color: rgb(30, 40, 60);\n    color: whitesmoke;\n    border-radius: 10px;\n    border: thick double rgb(120, 160, 255);\n    display: grid;\n    grid-template-rows: 2fr 2fr 1fr;\n    align-items: center;\n    justify-content: center;\n    font-family: 'walking';\n    font-size: 30px;\n}\n\n.folder:hover {\n    box-shadow: 3px 3px 8px black;\n    cursor: grab;\n}\n\n.folder:active {\n    box-shadow: 4px 4px 20px black;\n    border: thick double black;\n}\n\n.folder button {\n    font-family: 'walking';\n    font-size: 30px;\n    width: 150%;\n    justify-self: center;\n    background-color: rgb(45, 60, 90);;\n    color: whitesmoke;\n}\n\n.folder button:hover {\n    color: black;\n    background-color: rgb(50, 70, 120);;\n}\n\n.folder button:active {\n    background-color: rgb(60, 80, 120);;\n}\n\n\n/* FOOTER */\n\n#footer {\n    background-color: rgb(45, 45, 45);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    font-family: 'walking';\n    font-size: 25px;\n}\n\n#footer * {\n    color: white;\n}\n\n.hidden {\n    display: none;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 17 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 18 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),
/* 19 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),
/* 20 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6004c6a76f3f86af5698.otf";

/***/ }),
/* 21 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "07682c2302897e4ce6dd.otf";

/***/ }),
/* 22 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fad9417321b1572ac2b1.otf";

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			0: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pageBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _storageHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);




const page = document.createElement("div");
page.id = "pageContent";
document.body.appendChild(page);

(0,_pageBuilder__WEBPACK_IMPORTED_MODULE_0__.buildPage)(page);

/*
clearData();//To remove later
let data = null;
data = loadData();

const date1 = new Date(2024, 2, 4);
const date2 = new Date(2023, 3, 4);
const date3 = new Date(2023, 5, 4);
const date4 = new Date(2023, 3, 6);
const date5 = new Date(2023, 3, 10);

addFolder(data, "default");
addToFolder(data, "default", "YOYO CA VA OU QUOI", "This is a test", date1, "low");
addToFolder(data, "default", "SALUT", "This is a test that is very long just to test if I can handle overflow properly yo", date2, "high");

addFolder(data, "home");
addToFolder(data, "home", "Clean the kitchen", "The kitchen must be clean, don't forget the spoons and the dead cat behind the fridge !", date3, "medium");
addToFolder(data, "home", "Make food", "Some pasta and let's go !", date4, "high");
addToFolder(data, "home", "Buy food", "The lidl is the closest way to achieve that, don't go to late tho it closes at 8pm now !", date5, "low");

addFolder(data, "work");
//displayData(data);

saveData(data);
*/

//populateList(data);
(0,_pageBuilder__WEBPACK_IMPORTED_MODULE_0__.preparePopulate)();

})();

/******/ })()
;