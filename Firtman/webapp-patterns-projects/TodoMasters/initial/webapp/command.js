import { TodoItem, TodoList } from "./classes.js";
import { TodoHistory } from "./memento.js";

export class Command {
    name;
    args; // Array
    constructor( name, args ) {
        this.name = name;
        this.args = args;
    }
}

export const Commands = {
    ADD: "add",
    DELETE: "delete",
    UNDO: "undo"
}

export const CommandExecutor = {

    execute( command ) {
        const todolist = TodoList.getInstance();

        switch ( command.name ) {
            case Commands.ADD:
                const todoInput    = globalThis.DOM.todoInput;
                const todoText     = todoInput.value.trim();
                const itemToAdd    = todolist.find( todoText );

                if ( todoText != "" && itemToAdd == undefined ) {
                    // Clear the Input
                    todoInput.value = ""
                    // Add Todo to the list
                    todolist.add( new TodoItem( todoText ))
                }
                break;
            case Commands.DELETE:
                const [ itemToDelete ] = command.args
                todolist.delete( itemToDelete )
                break;
            case Commands.UNDO:
                const previousList = TodoHistory.pop();
                if ( previousList ) {
                    todolist.replaceList( previousList );
                }
                break;
        }
    }
}