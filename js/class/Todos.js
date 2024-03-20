import { Task } from './task.js'

class Todos {
    #tasks = []
    #backend_url = ''

    constructor(url) {
        this.#backend_url = url
    }

    getTask = () => {
        return new Promise((resolve, reject) => {
            fetch(this.#backend_url)
                .then(response => response.json())
                .then(data => {
                    this.#tasks = data.map(task => new Task(task.id, task.discription))
                    resolve(this.#tasks)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    addTask = (text) => {
        return new Promise(async (resolve, reject) => {
            const json = JSON.stringify({ discription: text })
            fetch(this.#backend_url + '/new',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
                .then(response => response.json())
                .then(json => {
                    resolve(this.#addToArray(json.id, text))
                },(error) => {
                    reject(error)
                })
        })
    }

    removeTask = (id) => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backend_url + '/delete/' + id, {
                method: 'delete'
            })
                .then(response => response.json())
                .then(json => {
                    this.#removeFromArray(id)
                    resolve(json.id)
                },(error) => {
                    reject(error)
                })
        })
    }

    #readJson = (taskAsJson) => {
        taskAsJson.forEach(node => {
            const task = new Task(node.id, node.discription)
            this.#tasks.push(task)
        })
    }

#addToArray = (id, text) => {
    const task = new Task(id, text)
    this.#tasks.push(task)
    return task
}

#removeFromArray = (id) => {
    const arrayWithRemovedTask = this.#tasks.filter(task => task.getId() !== id)
    this.#tasks = arrayWithRemovedTask
}
}

export { Todos }