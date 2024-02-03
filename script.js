const input = document.querySelector("input")
const addButton = document.querySelector('.add-btn')
const todosHtml = document.querySelector('.todos')
const emptyImg = document.querySelector('.empty-img')
let todosJson = JSON.parse(localStorage.getItem('todos')) || [];

const deleteAllBtn = document.querySelector('.delete-all')
const filters = document.querySelectorAll('.filter')
let filter = '';


{/* <span class="${checked}">${todo.name}</span> */}

function getTodoHtml(todo, index) {
    if(filter && filter !== todo.status){
        return '';
    }
    let checked = todo.status === "completed" ? "checked" : "" ;
    return  `
    <li class="todo">
        <label for="${index}">
            <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked} />
            <span class="${checked}">
            ${todo.name}
        </span>
        

        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)"> <i class="bi bi-file-x"></i></button>

    </li>
    `;

}

function showTodos(){
    if(todosJson.length == 0){
        todosHtml.innerHTML = "";
        emptyImg.style.display = "block"
    } else{
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
        emptyImg.style.display = "none"
    }
}

function addTodo(todo) {
    input.value = "";
    todosJson.unshift({  
        name: todo,
        status: "pending" })
        localStorage.setItem("todos", JSON.stringify(todosJson))
        showTodos()
}

input.addEventListener("keyup", e => {
    let todo = input.value.trim()
    if(!todo || e.key != "Enter"){
        return;
    }
    addTodo(todo)
})

addButton.addEventListener("click" , () => {
    let todo = input.value.trim();
    if(!todo) {
        return;
    }
    addTodo(todo)
})

function updateStatus(todo){
    console.log("chal rha h ")
    let todoName = todo.parentElement.lastElementChild;
    if(todo.checked){
        todoName.classList.add("checked")
        todosJson[todo.id].status = "completed";
    } else{
        todoName.classList.remove("checked")
        todosJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson))
}


function remove(todo){
    const index = todo.dataset.index;
    todosJson.splice(index, 1)
    showTodos()
    localStorage.setItem("todos", JSON.stringify(todosJson))
}

filters.forEach(function (el) {
    el.addEventListener("click", (e) => {
        if(el.classList.contains('active')){
            el.classList.remove('active')
            filter = '';
        } else{
            filters.forEach(tag => tag.classList.remove('active'));
            el.classList.add('active')
            filter = e.target.dataset.filter;
        }
        showTodos()
    })
})

deleteAllBtn.addEventListener("click", () => {
    todosJson = [];
    localStorage.setItem('todos', JSON.stringify(todosJson));
    showTodos()
})



// const input = document.querySelector(".todo-input");
// const addButton = document.querySelector('.add-btn');
// const todosHtml = document.querySelector('.todos');
// const emptyImg = document.querySelector('.empty-img');
// let todosJson = JSON.parse(localStorage.getItem('todos')) || [];

// const deleteAllBtn = document.querySelector('.delete-all');
// const filters = document.querySelectorAll('.filter');
// let filter = '';

// function getTodoHtml(todo, index) {
//     if (filter && filter !== todo.status) {
//         return '';
//     }
//     let checked = todo.status == "completed" ? "checked" : "";
//     return  `
//     <li class="todo">
//         <label for="${index}">
//             <input id="${index}" onclick="updateStatus(${index})" type="checkbox" ${checked} />
//             <span class="${checked}">
//                 ${todo.name}
//             </span>
//         </label>
//         <button class="delete-btn" data-index="${index}" onclick="remove(${index})"> <i class="bi bi-file-x"></i></button>
//     </li>
//     `;
// }

// function showTodos() {
//     if (todosJson.length === 0) {
//         todosHtml.innerHTML = "";
//         emptyImg.style.display = "block";
//     } else {
//         todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
//         emptyImg.style.display = "none";
//     }
// }

// function addTodo(todo) {
//     input.value = "";
//     todosJson.unshift({  
//         name: todo,
//         status: "pending" });
//     localStorage.setItem("todos", JSON.stringify(todosJson));
//     showTodos();
// }

// input.addEventListener("keyup", e => {
//     let todo = input.value.trim();
//     if (!todo || e.key !== "Enter") {
//         return;
//     }
//     addTodo(todo);
// });

// addButton.addEventListener("click" , () => {
//     let todo = input.value.trim();
//     if (!todo) {
//         return;
//     }
//     addTodo(todo);
// });

// function updateStatus(index) {
//     console.log("chal rha h ");
//     let todoName = todosHtml.children[index].querySelector('span');
//     todosJson[index].status = todosJson[index].status === "completed" ? "pending" : "completed";
//     localStorage.setItem("todos", JSON.stringify(todosJson));

//     if (todosHtml.children[index].querySelector('input').checked) {
//         todoName.classList.toggle("checked");
//     } else {
//         todoName.classList.remove("checked");
//     }

//     showTodos();
// }


// function remove(index) {
//     todosJson.splice(index, 1);
//     showTodos();
//     localStorage.setItem("todos", JSON.stringify(todosJson));
// }

// filters.forEach(function (el) {
//     el.addEventListener("click", (e) => {
//         if (el.classList.contains('active')) {
//             el.classList.remove('active');
//             filter = '';
//         } else {
//             filters.forEach(tag => tag.classList.remove('active'));
//             el.classList.add('active');
//             filter = e.target.dataset.filter;
//         }
//         showTodos();
//     });
// });

// deleteAllBtn.addEventListener("click", () => {
//     todosJson = [];
//     localStorage.setItem('todos', JSON.stringify(todosJson));
//     showTodos();
// });
