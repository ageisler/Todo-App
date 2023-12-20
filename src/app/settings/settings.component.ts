import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PriorityChooserComponent} from "../priority-chooser/priority-chooser.component";
import {DataService} from "../data.service";

@Component({
  selector: 'app-settings',
  standalone: true,
    imports: [
        FormsModule,
        PriorityChooserComponent,
        ReactiveFormsModule
    ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  constructor(public dataService: DataService) {
  }

}
