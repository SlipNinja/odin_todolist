

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

const displayData = (data) => {
    console.log(data);
};

const saveData = (data) => {
    localStorage.setItem("tododata", JSON.stringify(data));
}

const clearData = () => {
    localStorage.clear();
}

export {loadData, displayData, addFolder, addToFolder, clearData, saveData};