document.addEventListener("DOMContentLoaded", function() {
console.log('ready');

let toDoForm = document.getElementById('todo-form');
let todoInput = document.querySelector('.todo-input');
let formButton = document.querySelector('.add-todo');
let list = document.querySelector('.todo-list');


formButton.addEventListener('click',function(event){
    let classes;
    event.preventDefault();
    if (todoInput.value.length < 1) return;
    createTodo(todoInput.value, classes);
    toDoForm.reset();
});

function buildList(){
    console.log('building list');
    //access local storage and cycle the object to add the todo's found.
    let itemList = JSON.parse(localStorage.getItem('itemList')); 
    console.log(itemList);
    for(let items of itemList){
        let title = items.itemTitle;
        let classes = items.classes;
        console.log('classes',classes);
        let setClasses = Object.values(items.classes);
        let classLists;
        setClasses = setClasses.join(' ');
        console.log(setClasses);
        console.log(title,setClasses);
        createTodo(title,setClasses);
        
    }
    
    
}

buildList();

function createTodo(todo, classes){
    
    console.log(todo, classes);
    if (classes === undefined || classes === "") {
        classes = "todo-title";
    }
    //creat list item structure
    let listItem = document.createElement('li');
    listItem.classList.add("todo-item");
    let title = document.createElement('div');
    title.className = classes;
    title.innerText = todo;
    let controls = document.createElement('div');
    controls.classList.add('todo-controls');
    let done = document.createElement('button');
    done.innerHTML = "&#10004";
    done.className='done';
    let erase = document.createElement('button');
    erase.className ='erase';
    erase.innerHTML = "&#10006"
    //form the task and append it to the list
    listItem.appendChild(title);
    controls.appendChild(done);
    controls.appendChild(erase);
    listItem.appendChild(controls);
    list.appendChild(listItem);

    //call update Local Storage
    updateStorage();

};


//event delegation for done button and erase button
//if the button is pressed and has class done find parent and toggle cross class
// if the button is pressed and has class of erase find parent and remove from list
list.addEventListener('click',function(event){
    console.log(event.target.className);
    if(event.target.className === 'done'){
        let item = event.target.parentElement.parentElement.querySelector('.todo-title');
        console.log(item);
        item.classList.toggle('strikedThrough');
        // event.target.classList.toggle('strikedThrough');
        //call update Local Storage
    }
    if (event.target.className === 'erase') {
        console.log(event.target.parentElement.parentElement.remove());
        //call update Local Storage
    }
    updateStorage();
});


function updateStorage(){
    console.log("update storage");
    let listitem = document.querySelectorAll('.todo-item');
    console.log(listitem);
    //using spread operatot to use array method on collection
    let m = [...listitem].map(function(item) {
      return {
        itemTitle: item.querySelector('.todo-title').innerText,
        classes: item.querySelector('.todo-title').classList
      }
    })
    localStorage.setItem('itemList', JSON.stringify(m));
}

});