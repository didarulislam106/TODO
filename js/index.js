const BACKEND_ROOT_URL = 'http://localhost:3001';
import test from "node:test";
import { Todos } from "./class/Todos.js";

const todos = new Todos(BACKEND_ROOT_URL);

const list = document.querySelector('ul');
const input = document.querySelector('input');

input.disabled = true;

const renderTask = (task) => {
    const li = document.createElement('li');
    li.setAttribute('class','list-group-item');
    li.setAttribute('data-key', task.getId().toString());
    li.innerHTML = task.getTask();
    renderSpan(li, task.getTask());
    renderLink(li, task.getId());
    list.append(li);
}

const renderSpan = (li, task) => {
    const span = li.appendChild(document.createElement('span'))
    span.innerHTML = test
}

const renderLink = (li, id) => {
    const a = li.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>'
    a.setAttribute('style', 'float:right')
    a.addEventListener('click',(e) => {
        todos.removeTask(id).then((removed_id) => {
            const li_to_remove = document.querySelector(`[data-key="${removed_id}"]`)
            if (li_to_remove) {
                list.removeChild(li_to_remove)
            }
        }).catch((error) => {
            alert(error)
        })
})
}

const getTasks = () => {
    todos.getTask().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task);
        })
    }).catch((error) => {
        alert(error)
    })
}

const saveTask = async (task) => {
    try {
        const json = JSON.stringify({discription: task})
        const response = await fetch(BACKEND_ROOT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        return response.json();
    } catch (error) {
        alert('Error saving task' + error.message);
    }
}

input.addEventListener('keypress',(e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
           const task = input.value.trim();
              if (task !== '') {
                todos.addTask(task).then((task) => {
                     renderTask(task)
                     input.value = ''
                     input.focus()
                })
              }
    }
})

getTasks(); 

