import {Routes} from '@angular/router';
import {ListComponent} from "./list/list.component";
import {NewTodoComponent} from "./new-todo/new-todo.component";
import {ListViewComponent} from "./list-view/list-view.component";

export const routes: Routes = [
  {
    path: "",
    component: ListViewComponent,
    title: "Liste"
  },
  {
    path: "new",
    component: NewTodoComponent,
    title: "Neues Todo"
  },
  {
    path: "settings",
    component: ListComponent,
    title: "Einstellungen"
  }
];
