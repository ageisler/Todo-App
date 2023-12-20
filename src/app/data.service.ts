import { Injectable } from '@angular/core';
import {Todo} from "./Todo";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public Todos: Todo[] = [];
  public filteredTodos : Todo[] = [];
  public categories: string[] = [];

  saveBannerHtml : string = '';
  defaultDate = '';

  newTodoDescription = '';
  newTodoDueDate = '';
  newTodoCategory = '';
  newTodoPriority = '1';

  //settings
  readyTodoSetting = false;
  deleteTodoSetting = false;

  constructor() {
    this.loadTodos();
    this.loadSettings();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    this.defaultDate = `${year}-${month}-${day}`;
    this.newTodoDueDate = this.defaultDate;
  }

  resetBaseVariables(){
    //banner
    this.saveBannerHtml = '';

    //filter
    this.filteredTodos = [];
  }

  loadTodos(){
    this.Todos = [];
    const entriesString = localStorage.getItem('Todos');

    if (entriesString) {
      const entriesArray = JSON.parse(entriesString);

      for(let entry of entriesArray){
        this.Todos.push(new Todo(Number(entry.id), entry.description, entry.dueDate, entry.category, entry.priority, entry.status));
      }

      console.log(entriesArray);
    } else {
      console.log('No entries found in localStorage');
    }

    this.loadAllCategories();
  }

  loadAllCategories() {
    const categoriesSet = new Set<string>();
    this.Todos.forEach(todo => {
      categoriesSet.add(todo.category);
    });
    this.categories = Array.from(categoriesSet);
  }

  addTodo(newTodoForm: NgForm) {
    let todosLength = this.Todos.length + 1;
    let newTodoID = this.getHighestId(this.Todos);

    if (newTodoID >= 0){
      newTodoID++;
      try {
        this.Todos.push(new Todo(newTodoID , this.newTodoDescription, this.newTodoDueDate, this.newTodoCategory, this.newTodoPriority, false));
        this.saveTodosToLocalStorage();
        this.showSaveBanner("Erfolgreich hinzugefügt", true);
        this.clearForm(newTodoForm);
        this.loadAllCategories();
      } catch (e) {
        console.error(e);
        this.showSaveBanner("Fehler beim Hinzufügen!", false);
      }
    }
  }

  saveTodosToLocalStorage(){
    try {
      localStorage["Todos"] = JSON.stringify(this.Todos);
    } catch (e) {
      console.error(e);
    }
  }

  deleteTodo(todoId: any) {
    try {
      this.Todos = this.Todos.filter((todo) => todo.id !== todoId);
      this.saveTodosToLocalStorage();
      this.loadTodos();
      this.loadAllCategories();
      this.showSaveBanner("Todo erfolgreich gelöscht", true);
    } catch (e) {
      console.error(e);
      this.showSaveBanner("Fehler beim löschen", false);

    }
  }

  filterByCategory(categoryFilter?: string){
    if (categoryFilter === null) {
      this.filteredTodos = [];
    } else {
      this.filteredTodos = this.Todos.filter(item => item.category === categoryFilter);
    }
  }

  getHighestId(arrayOfObjects: Todo[]): number {
    if (!arrayOfObjects || arrayOfObjects.length === 0) {
      return 0;
    }

    return arrayOfObjects.reduce((maxId, obj) => {
      const currentId = obj.id || 0;

      return currentId > maxId ? currentId : maxId;
    }, -Infinity);
  }

  setUpTestData() {
    try {

      this.deleteAllTodos();
      this.Todos.push(new Todo(1, "Rasen mähen", "2023-09-12", "Hausarbeit", "1" ,false));
      this.Todos.push(new Todo(2, "Spülmaschine ausräumen", "2023-09-20", "Hausarbeit", "1", false));
      this.Todos.push(new Todo(3, "Fussballtraining absagen", "2023-10-01", "Verein", "2", false));
      this.Todos.push(new Todo(4, "Rechnungen überweisen", "2023-12-15", "Finanzen", "3", true));

      this.saveTodosToLocalStorage();
      this.loadAllCategories();
      this.showSaveBanner("Testdaten erfolgreich angelegt", true);
    } catch (e) {
      console.error(e);
      this.showSaveBanner("Fehler beim anlegen der Testdaten! Infos in der Konsole.", false);
    }
  }

  deleteAllTodos(){
    try {
      this.Todos = [];
      this.categories = [];
      this.showSaveBanner("Alle Daten erfolgreich gelöscht", true);
    } catch (e) {
      console.error(e);
      this.showSaveBanner("Fehler beim Löschen aller Daten!", false);
    }
  }

  clearForm(newTodoForm : NgForm){
    newTodoForm.resetForm();
    //form
    this.newTodoDescription = '';
    this.newTodoDueDate = this.defaultDate;
    this.newTodoCategory = '';
    this.newTodoPriority = '1';
  }

  showSaveBanner(message: string, successful: boolean) {
    const alertClass = successful ? 'alert-success' : 'alert-danger';

    this.saveBannerHtml = `<div class='alert ${alertClass}'><p>${message}</p></div>`;
  }

  loadSettings(){

    const entriesString = localStorage.getItem('TodosSettings');

    if (entriesString) {
      const entry = JSON.parse(entriesString);

      this.readyTodoSetting = entry[0].readyTodo;
      this.deleteTodoSetting = entry[0].deleteTodo;
      console.log(entry);
    } else {
      console.log('No entries found in localStorage');
    }
  }

  saveSettings(form: NgForm){
    let settings = [{"readyTodo": this.readyTodoSetting ?? false, "deleteTodo": this.deleteTodoSetting ?? false}];
    try {
      localStorage["TodosSettings"] = JSON.stringify(settings);
      this.showSaveBanner("Einstellungen gespeichert", true);
    } catch (e) {
      console.error(e);
      this.showSaveBanner("Fehler beim Speichern der Einstellungen", false);
    }
  }
  changeStatus(todo: Todo) {
    todo.status = !todo.status;
    this.saveTodosToLocalStorage();
  }

  get activeTodos(): Todo[] {
    if (this.filteredTodos.length > 0) {
      return this.filteredTodos.filter(todo => !todo.status);
    } else {
      return this.Todos.filter(todo => !todo.status);
    }
  }

  get doneTodos(): Todo[] {
    if (this.filteredTodos.length > 0) {
      return this.filteredTodos.filter(todo => todo.status);
    } else {
      return this.Todos.filter(todo => todo.status);
    }
  }
}
