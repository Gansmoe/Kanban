// import av alla moduels
import { logOut } from "./modules/logout.mjs";
import { kanban } from "./modules/kanban.mjs";

const logOutBtn = document.querySelector(".logOutButton")

logOutBtn.addEventListener("click", function (){
    logOut()
});

kanban();
