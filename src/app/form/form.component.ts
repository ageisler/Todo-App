import { Component } from '@angular/core';
import {DataService} from "../data.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  constructor(protected dataService: DataService) {
    this.dataService.getAllCategories();
  }
}
