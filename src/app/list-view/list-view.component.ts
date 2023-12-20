import { Component } from '@angular/core';
import {ListComponent} from "../list/list.component";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [ListComponent, SidebarComponent],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css'
})
export class ListViewComponent {

}
