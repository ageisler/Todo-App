import { Injectable } from '@angular/core';
import {Todo} from "./Todo";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public Todos: Todo[] = [];
  public filteredTodos : Todo[] = [];
  public categories: String[] = [];

  saveSuccessful = false;

  newTodoDescription = '';
  newTodoDueDate = '';
  newTodoCategory = '';

  constructor() {
    this.loadTodos();
  }
  loadTodos(){
    // this.Todos.push(new Todo(1, "Test", "2023-02-01", "Test"));
    // this.Todos.push(new Todo(2, "Test2", "2023-02-01", "Sport"));
    // this.Todos.push(new Todo(3, "Test3", "2023-02-01", "School"));
    // this.Todos.push(new Todo(4, "Test4", "2023-02-01", "Test"));

    const entriesString = localStorage.getItem('Todos');

    if (entriesString) {
      const entriesArray = JSON.parse(entriesString);

      for(let entry of entriesArray){
        this.Todos.push(new Todo(Number(entry.id), entry.description, entry.dueDate, entry.category));
      }

      console.log(entriesArray);
    } else {
      console.log('No entries found in localStorage');
    }
  }

  getAllCategories() {
    const categoriesSet = new Set<string>();
    this.Todos.forEach(todo => {
      categoriesSet.add(todo.category);
    });
    this.categories = Array.from(categoriesSet);
  }

  addTodo(newTodo: any) {
    let todosLength = this.Todos.length + 1;
    this.newTodoDescription = newTodo.description;
    this.newTodoDueDate = newTodo.dueDate;
    this.newTodoCategory = newTodo.category;
    this.Todos.push(new Todo(todosLength , this.newTodoDescription, this.newTodoDueDate, this.newTodoCategory));

    this.newTodoDescription = '';
    this.newTodoDueDate = '';
    this.newTodoCategory = '';

    this.saveTodosToLocalStorage();
  }

  saveTodosToLocalStorage(){
    try {
      localStorage["Todos"] = JSON.stringify(this.Todos);
      this.saveSuccessful = true;
    } catch (e) {
      console.error(e);
      this.saveSuccessful = false;
    }
    console.log(localStorage["Todos"]);
  }

  filterByCategory(categoryFilter: any){
    this.filteredTodos = this.Todos.filter(category => category === categoryFilter);
  }
}
