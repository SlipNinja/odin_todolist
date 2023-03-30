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

addFolder(data, "default");
addToFolder(data, "default", "COUCOU CA VA OU QUOI", "This is a test", "some date", 5);
addToFolder(data, "default", "SALUT", "This is a test", "some date", 3);
displayData(data);

saveData(data);

//populateList(data);
preparePopulate();


