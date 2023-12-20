import { Component } from '@angular/core';
import {DataService} from "../data.service";
import {FormsModule} from "@angular/forms";
import {PriorityChooserComponent} from "../priority-chooser/priority-chooser.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    PriorityChooserComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  showInputField = false;

  constructor(protected dataService: DataService) {
  }
}
