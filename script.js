//Retrive to do from a storage or initialize an empty array

let toDo = JSON.parse(localStorage.getItem("toDo")) || [];
const toDoInput = document.getElementById("toDoInput");
const toDoList = document.getElementById("toDoList");
const toDoCount = document.getElementById("toDoCount");
const addButton = document.querySelector(".button");
const xButton = document.getElementById("xButton");
const deleteButton = document.getElementById("deleteButton");
// Initialize
document.addEventListener("DOMContentLoaded", function () {
addButton.addEventListener("click", addTask);
toDoInput.addEventListener('keydown', function (event){
    if (event.key === "Enter"){
        event.preventDefault();
        addTask();
    }
});
deleteButton.addEventListener("click", deleteAllTasks);
displayTask();

});
function addTask(){
    const newTask = toDoInput.value.trim();
    if (newTask !== ""){
        toDo.push({
            text: newTask, 
            disabled: false,
        });
        saveToLocalStorage();
        toDoInput.value = "";
        displayTask();
    }
}
function displayTask(){
    toDoList.innerHTML = "";
    toDo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
        <div class="toDoContainer" id="toDoContainer">
            <input type="checkbox" class="toDoCheckbox" id="input-${index}" ${item.disabled ? "checked" : ""
        }>
        <p id="toDo${index}" class="${item.disabled ? "disabled" : ""
        }" onclick="editTask(${index})">${item.text}</p>
        <button class="X" id="xButton">X</button>
        </div>
        `;
        p.querySelector(".toDoCheckbox").addEventListener("change", () =>
            toggleTask(index)
        );
        toDoList.appendChild(p);
        const xButton = p.querySelector(".X")
        xButton.addEventListener("click", () => deleteTask(index));
    });
    toDoCount.textContent = toDo.length;
}

function editTask(index) {
    const toDoItem = document.getElementById(`toDo${index}`); // Use backticks here
    const existingText = toDo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    toDoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updateText = inputElement.value.trim();
        if (updateText) {
            toDo[index].text = updateText;
            saveToLocalStorage();
            displayTask();
        }
    });
}

function toggleTask(index){
    toDo[index].disabled =!toDo[index].disabled;
    saveToLocalStorage();
    displayTask();
}

function deleteAllTasks() {
    toDo = [];
    saveToLocalStorage();
    displayTask();
}

function saveToLocalStorage(){
    localStorage.setItem("toDo", JSON.stringify(toDo));
}

function deleteTask(index){
    toDo.splice(index, 1);
    saveToLocalStorage();
    displayTask();
}