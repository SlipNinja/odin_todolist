import buildPage from './pageBuilder';
import './style.css';

const page = document.createElement("div");
page.id = "pageContent";

buildPage(page);

document.body.appendChild(page);