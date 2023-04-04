import {buildPage, preparePopulate} from './pageBuilder';
import {loadData, saveData, clearData, displayData, addFolder, addToFolder} from './storageHandler';
import './style.css';

const page = document.createElement("div");
page.id = "pageContent";
buildPage(page);
document.body.appendChild(page);

clearData();//To remove later

let data = null;
data = loadData();

const date1 = new Date(2024, 2, 4);
const date2 = new Date(2023, 3, 4);

/*
const today = new Date();
console.log(date2);
console.log(today);

console.log(date2 - today);
console.log((date2 - today)/86400000);
*/

addFolder(data, "default");
addToFolder(data, "default", "YOYO CA VA OU QUOI", "This is a test", date1, "low");
addToFolder(data, "default", "SALUT", "This is a test that is very long just to test if I can handle overflow properly yo", date2, "high");
//displayData(data);

saveData(data);

//populateList(data);
preparePopulate();

const x = document.getElementById("todolist");
    console.log(x.children[0]);


