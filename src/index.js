import {buildPage, preparePopulate} from './pageBuilder';
import {loadData, saveData, clearData, displayData, addFolder, addToFolder} from './storageHandler';
import './style.css';

const page = document.createElement("div");
page.id = "pageContent";
document.body.appendChild(page);

buildPage(page);

clearData();//To remove later

let data = null;
data = loadData();

const date1 = new Date(2024, 2, 4);
const date2 = new Date(2023, 3, 4);
const date3 = new Date(2023, 5, 4);
const date4 = new Date(2023, 3, 6);
const date5 = new Date(2023, 3, 5);

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

//populateList(data);
preparePopulate();

const x = document.getElementById("todolist");
    console.log(x.children[0]);


