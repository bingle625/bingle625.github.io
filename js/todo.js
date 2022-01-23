const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

let todoArray = [];

const TODOS_KEY="todos";

function saveTodo(){
    localStorage.setItem(TODOS_KEY , JSON.stringify(todoArray));
}

function deleteTodo(event){
    li = event.target.parentElement;
    li.remove();
    todoArray = todoArray.filter(todo => todo.id !== parseInt(li.id));
    console.log(todoArray);
    saveTodo();
}

function paintTodo(newTodo){
    const li = document.createElement("li");
    li.id=newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText="❌";
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
    button.addEventListener("click",deleteTodo);
}

function handleToSubmit(event){
    event.preventDefault();
    console.log("hi");
    const newTodo = toDoInput.value;
    const newTodoObject = {
        text:newTodo,
        id:Date.now(),
    };
    toDoInput.value = "";
    todoArray.push(newTodoObject);
    saveTodo();
    paintTodo(newTodoObject);
}

toDoForm.addEventListener("submit",handleToSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null){
    const parsedTodos =JSON.parse(savedTodos);
    todoArray = parsedTodos;
    parsedTodos.forEach(paintTodo);
}