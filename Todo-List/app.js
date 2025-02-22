const form = document.querySelector('#form');
const list = document.querySelector('#list');
const input = document.getElementById('todo-input');

// Strikethrough when checked
// Delete Functionality

class TodoList {
    constructor(todos) {
        this.todos = todos;
    }

    static uuid() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    refreshTodos() {
        while (list.firstChild) {
            list.firstChild.remove();
        }
        for (let todo of this.todos) {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('class', 'form-check-input');
        
            li.innerText = todo.task + ' ';
            li.append(checkbox);
            list.append(li);
        }
    }
    
    addTodo(todoText) {
        this.todos.push({ id: TodoList.uuid(), task: todoText, completed: false });
        localStorage.setItem('TodoList', JSON.stringify(this.todos));
        this.refreshTodos();
    }

    init() {
        this.refreshTodos();
    }
}


const todos = [
    {
        id: TodoList.uuid(),
        task: "Buy Groceries",
        completed: false
    },
    {
        id: TodoList.uuid(),
        task: "Learn JS",
        completed: false
    },
    {
        id: TodoList.uuid(),
        task: "Go to Gym",
        completed: false
    }
];

const savedTodos = JSON.parse(localStorage.getItem('TodoList'));

let myTodoList = [];
if (savedTodos && savedTodos.length !== 0) {
    myTodoList = new TodoList(savedTodos);
} else {
    myTodoList = new TodoList(todos);
}

myTodoList.init();

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const todoText = form.elements[0].value;
    console.log(todoText);
    myTodoList.addTodo(todoText);
    input.value = '';
});
