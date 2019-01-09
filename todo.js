
//select All Element
const form = document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const todoList=document.querySelector(".list-group");
const firstCarBody = document.querySelectorAll(".card-body")[0];
const secondCardBody=document.querySelectorAll(".card-body")[1];
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");

//call eventLisners function to execute.
eventListeners();

//All eventListeners
function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

//add todo function
/**
 * @param  e : Element
 */
function addTodo(e){
    const newTodo=todoInput.value.trim();
        if(newTodo === ""){
            showAlert("danger","Please enter a Todo");
        }else{
        //add card as list item
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo added successfully ");
        }
    e.preventDefault();
}

/** 
 * 
 * @param newTodo:get all todos from storage.
 */
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

/** 
 * 
 * @param newTodo:add a newTodo to localStorage.
 */
function addTodoToStorage(newTodo){
   let todos=getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));

}


/**
 * @param type: Alert type 
 * @param message: Alert message
 */
//create  an alert
function showAlert(type,message){
const alert =document.createElement("div");
alert.className= `alert alert-${type}`;
alert.textContent = message;
firstCarBody.appendChild(alert);
    setTimeout(function() {
        alert.remove();
    },1000)
}

//add Todo to UI
/**
 * @param newTodo : todo text 
 */
function addTodoToUI(newTodo){

    //create list item
    const listItem=document.createElement("li");

    //create link item
    const link =document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";
    listItem.className="list-group-item d-flex justify-content-between";

    //add text note
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //add list to todoList
    todoList.appendChild(listItem);

    //clear inputbox after Todo added
    todoInput.value = "";
}
/**
 * loadAllTodos to Ui from Storage.
 */
function loadAllTodosToUI(){
   let todos= getTodosFromStorage();

   todos.forEach(function(todo){
    addTodoToUI(todo);

   });
}

/**
 * 
 * @param: Event;
 * delete a todo from storage when clicking remove button.
 */
function deleteTodo(e){
    
   if(e.target.className==="fa fa-remove"){
      e.target.parentElement.parentElement.remove();
      deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
      showAlert("success","todo deleted successfully...");
   }
}

/**
 * 
 * @param deleteTodo 
 * Delete todo from Storage . 
 */
function deleteTodoFromStorage(deleteTodo){

    let todos=getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo===deleteTodo){
            todos.splice(index,1); // delete a todo from given index 
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

/**
 * 
 * @param Element
 * 
 * search todos
 */
function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){

        const text=listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue)===-1){

            //could`nt find 
            listItem.setAttribute("style","display : none !important"); 
        }else{
            listItem.setAttribute("style","display : block");  
        }
    });
}

/**
 * 
 * @param Element
 * 
 * delete All todos from UI and Storage . 
 */
function clearAllTodos(e){
    if(confirm("Are you sure to delete all todos ?")){
    //delete all todos from UI
       // todoList.innerHTML = "";   // so slow to delete

       while(todoList.firstElementChild !=null){

        todoList.removeChild(todoList.firstElementChild);

       }
       localStorage.removeItem("todos");
    }
}
