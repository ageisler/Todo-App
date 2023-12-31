import { Component } from '@angular/core';
import {DataService} from "../data.service";
import {SearchFilterPipe} from "../search-filter.pipe";
import {Todo} from "../Todo";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, SearchFilterPipe, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  searchTerm: string = '';
  filteredItems: Todo[] = [];

  constructor(protected dataService: DataService) {
    dataService.resetBaseVariables();
  }

  search(searchTerm: string) {
    this.searchTerm = searchTerm.toLowerCase();
  }

  filterItems(searchTerm: string) {
    this.filteredItems = this.dataService.Todos.filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

}
