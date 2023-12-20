import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//components
import { NavbarComponent } from "./navbar/navbar.component";
import {DataService} from "./data.service";
import {MessageBoxComponent} from "./message-box/message-box.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, MessageBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDo';

  constructor(public dataService: DataService) {
  }
}
