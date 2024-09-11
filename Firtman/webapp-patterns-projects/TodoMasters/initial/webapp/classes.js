import { observerMixin } from "./mixin.js";

export class TodoItem {
    constructor( text ) {
        this.text = text;
    }

    equals ( other ) { // Value Object Pattern
        return this.text == other.text;
    }
}

export class TodoList { // Singleton Pattern
    // Data
    #data = new Set();

    get items () { return this.#data }

    // Singleton
    constructor() {
        if ( TodoList.instance ) {
            throw new Error("Use TodoList.getInstance() to access the list");
        }
    }

    static instance = null;
    static {
        this.instance = new TodoList();
    }
    static getInstance() {
        return this.instance;
    }

    // List behavior
    add( item ) {
        const array = Array.from( this.#data );
        const todoExists = array.filter( t => t.equals( item )).length > 0;
        if ( !todoExists ) {
            this.#data.add( item );
            this.notify();
        }
    }

    delete ( todo_text ) {
        const array = Array.from( this.#data );
        // TODO: Check for errors
        const todoToDelete = array.filter( t => t.text == todo_text )[0];
        this.#data.delete( todoToDelete );
        this.notify();
    }

    find( todo_text ) {
        const array = Array.from( this.#data );
        return array.find( t => t.text == todo_text );
    }

    replaceList ( list ) {
        this.#data = list;
        this.notify()
    }
}

// Applying the observer mixin to the class
Object.assign( TodoList.prototype, observerMixin )