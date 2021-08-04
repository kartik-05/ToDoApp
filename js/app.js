
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const menu = document.querySelector(".menu");



document.addEventListener("DOMContentLoaded",getTodo);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
menu.addEventListener("click", filter);






function addTodo(event) {

    event.preventDefault();


    // creating div container
    const div = document.createElement("div");
    div.classList.add("todo");

    // add todo value to local storage
    save(todoInput.value);


    // creating check button 
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="far fa-check-circle"></i>';
    checkButton.classList.add("check-button");
    div.appendChild(checkButton);



    // creating list in div 
    const list = document.createElement("li");
    list.classList.add("todos");
    list.innerText = todoInput.value;
    div.appendChild(list);

    // delete button
    const delButton = document.createElement("button");
    delButton.innerHTML = '<i class="fas fa-times"></i>';
    delButton.classList.add("del-button");
    div.appendChild(delButton);


    todoList.appendChild(div);


    // clear todo input value
    todoInput.value = "";
}


function deleteTodo(event) {

    const e = event.target;


    if (e.classList[0] === "del-button") {
        const parent = e.parentElement;

        parent.classList.add("del");

        deleteLocalTodo(parent);

        parent.addEventListener('transitionend', function () {
            parent.remove();
        });
    }


    if (e.classList[0] === "check-button") {
        e.parentElement.classList.toggle("completed");
    }
}



function filter(event) {
    const nodes = todoList.childNodes;


    nodes.forEach(function (todo) {
        if (event.target.classList[0] === "all") {
            todo.style.display = "flex";
        }
        else if (event.target.classList[0] === "complete") {
            if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
            }
            else {
                todo.style.display = "none";
            }
        }
        else if (event.target.classList[0] === "active") {
            if (!todo.classList.contains("completed")) {
                todo.style.display = "flex";
            }
            else {
                todo.style.display = "none";
            }
        }
    });
}

function save(todo) {

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}




function getTodo() {

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {

        // creating div container
        const div = document.createElement("div");
        div.classList.add("todo");


        // creating check button 
        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="far fa-check-circle"></i>';
        checkButton.classList.add("check-button");
        div.appendChild(checkButton);



        // creating list in div 
        const list = document.createElement("li");
        list.classList.add("todos");
        list.innerText = todo;
        div.appendChild(list);

        // delete button
        const delButton = document.createElement("button");
        delButton.innerHTML = '<i class="fas fa-times"></i>';
        delButton.classList.add("del-button");
        div.appendChild(delButton);


        todoList.appendChild(div);

    });

}


function deleteLocalTodo(todo){

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoidx=todo.children[0].innerText;

    todos.splice(todos.indexOf(todoidx),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}