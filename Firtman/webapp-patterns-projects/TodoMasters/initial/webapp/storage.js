import { TodoList, TodoItem } from './classes.js'

const todoList = TodoList.getInstance()

export const LocalStorage = {
  load() {
    if ( localStorage.getItem("todos") ) {
      for ( let t of JSON.parse( localStorage.getItem("todos")) ) {
        todoList.add( new TodoItem( t.text ));
      }
    }
  },
  save() {
    localStorage.setItem("todos", JSON.stringify( Array.from( todoList.items )));
  }
}

todoList.addObserver( LocalStorage.save );
