

const body = document.getElementById("body");

// Kod för att generera inloggningssidan och göra inloggningsförsök
function loginPage() {
    createDiv();
    const div = document.getElementById("div");
    const form = document.createElement("form");

    const user = document.createElement("input");
    user.type = "text";
    user.id = "user";
    form.appendChild(user);
    div.appendChild(form);

    const psw = document.createElement("input");
    psw.type = "password";
    psw.id = "psw";
    form.appendChild(psw);
    div.appendChild(form);

    const btn = document.createElement("button");
    btn.id = "inBtn";
    const text = document.createTextNode("Logga in");
    btn.appendChild(text);
    div.appendChild(btn);

    const inBtn = document.getElementById("inBtn");

    inBtn.addEventListener("click", function () {
        const user = document.getElementById("user").value;
        const psw = document.getElementById("psw").value;

        deleteDiv();
        logIn(user, psw);


    })
}

// Kontroll om användaren är inloggad redan, är den inte det skickas den till inloggningssidan
function checkUser() {
    const user = localStorage.getItem("username");

    if (user) {
        const psw = "1234";
        logIn(user, psw);
    }
    else {
        loginPage();
    }
}

//Funktion för att kontrollera om inloggningsuppgifterna stämmer från JSON-filen
function logIn(user, psw) {

    const getData = async () => {
        const response = await fetch("user.json");
        const data = await response.json();

        for (let i = 0; i < data.length; i++) {

            if (user == data[i].user && psw == data[i].password) {
                console.log("Korrekt");
                localStorage.setItem("username", data[i].user);
                //localStorage.setItem("psw", data[i].password);

            }
            else {
                console.log("Fel!");

            }

        }
        if (localStorage.getItem("username") !== null) {
            showWelcomePage();
        }
        else {
            showErrorPage();
        }

    }

    getData();
};

// Visar kanban-sidan efter godkänd inloggning
function showWelcomePage() {

    window.location.replace("kanban.html");
}


// Genererar en sida för misslyckad inloggning
function showErrorPage() {
    createDiv();
    const div = document.getElementById("div");

    const failedText = document.createElement("p");
    const text = document.createTextNode("Fel lösenord eller användarnamn, vänligen försök igen");
    failedText.appendChild(text);
    div.appendChild(failedText);

    const backBtn = document.createElement("button");
    const btnText = document.createTextNode("Tillbaka");
    backBtn.appendChild(btnText);
    div.appendChild(backBtn);

    backBtn.addEventListener("click", function () {
        deleteDiv();
        loginPage();

    })
}


// Funktion för att ta bort HTML
function deleteDiv() {
    const divDelete = document.getElementById("div");
    divDelete.remove();
}

// Funktion för att lägga till en div
function createDiv() {
    let createDiv = document.createElement("div");
    createDiv.id = "div";
    body.appendChild(createDiv);
}

checkUser();