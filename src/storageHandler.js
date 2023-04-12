

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

export {loadData, displayData, addFolder, addToFolder, removeTodo, removeFolder, clearData, saveData};