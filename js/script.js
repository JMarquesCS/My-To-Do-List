const form = document.querySelector("#form");
const input = document.querySelector("#input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit");
const cancelEditBtn= document.querySelector("#cancel-edit-btn");
const editInput = document.querySelector("#edit-input");

let oldInputValue;

// funções

const newTask = (text) => {

// transformar a primeira letra em maiúscula
    const primeiraLetra = text.charAt(0).toUpperCase();

// obter o restante da string
    const restoDaString = text.substring(1);

    const newText = primeiraLetra+restoDaString;
    const todo = document.createElement("div");
    todo.classList.add("task");

    const texto = document.createElement("h3");
    texto.innerHTML = newText;
    todo.appendChild(texto);

    const finalizeBtn = document.createElement("button");
    finalizeBtn.classList.add("finalize-btn");
    finalizeBtn.classList.add("task-btn");
    todo.appendChild(finalizeBtn);
    finalizeBtn.innerHTML= '<i class="fa-solid fa-check"></i>';


    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.classList.add("task-btn");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deletBtn = document.createElement("button");
    deletBtn.classList.add("delet-btn");
    deletBtn.classList.add("task-btn");
    todo.appendChild(deletBtn);
    deletBtn.innerHTML= '<i class="fa-solid fa-xmark"></i>';
    todoList.appendChild(todo);

    input.value=""
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    form.classList.toggle("hide");
    todoList.classList.toggle("hide");
    cancelEditBtn.classList.toggle("hide");
};

const updateTodo = (text) => {

    const todos = document.querySelectorAll(".task");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
};

// Eventos

form.addEventListener ("submit", (e) => {
    e.preventDefault();
    
    const inputValue = input.value
    if(inputValue){
        newTask(inputValue);
    }else{
        console.log("nao enviou")
    }
});


document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;
    
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerHTML;
    }

    if(targetEl.classList.contains('finalize-btn')){
        parentEl.classList.toggle("done")
    }
    if(targetEl.classList.contains("delet-btn")){
        parentEl.remove();
    }
    if(targetEl.classList.contains("edit-btn")){
        toggleForms();

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
});

cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) =>{
    e.preventDefault();

    const editInputValue = editInput.value

    if(editInputValue){
        updateTodo(editInputValue)
    }
    toggleForms()
});