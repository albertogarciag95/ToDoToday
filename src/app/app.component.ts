import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth/auth.service';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'todo-today';
  userLogged: string;
  userFile: SafeResourceUrl;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.generateToken().subscribe(response => {
      this.authService.updateUserLogged(response.userLogged);
    });
  }
}


