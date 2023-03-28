import buildPage from './pageBuilder';
import {loadData, saveData, clearData, displayData, addFolder, addToFolder} from './storageHandler';
import './style.css';

const page = document.createElement("div");
page.id = "pageContent";


buildPage(page);

//clearData();

let data = null;
data = loadData();

/*
addFolder(data, "default");
addToFolder(data, "default", "COUCOU");
displayData(data);

saveData(data);
*/



document.body.appendChild(page);