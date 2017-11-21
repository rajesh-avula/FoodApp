import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './users/user.service';
import { User } from './users/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Online Food App';
  constructor() {

  }
}
