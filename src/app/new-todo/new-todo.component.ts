import {Component} from '@angular/core';
import {FormComponent} from "../form/form.component";
import {DataService} from "../data.service";

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.css'
})
export class NewTodoComponent {
  constructor( protected dataService: DataService) {

  }

}
