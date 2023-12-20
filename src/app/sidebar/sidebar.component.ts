import { Component } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(protected dataService: DataService) {
    dataService.getAllCategories();
  }

}
