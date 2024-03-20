class Task {
    #id
    #text

    constructor(id, text) {
        this.#id = id
        this.#text = text
    }

    get id() {
        return this.#id
    }

    get text() {
        return this.#text
    }
}

export { Task }