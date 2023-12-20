import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DataService} from "../data.service";

@Component({
  selector: 'app-priority-chooser',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './priority-chooser.component.html',
  styleUrl: './priority-chooser.component.css'
})
export class PriorityChooserComponent {

  constructor(public dataService: DataService) {
  }

}
