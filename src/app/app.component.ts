import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { fakeState } from './shared/mocks/fake-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'todo-today';

  constructor(private router: Router) {}

  hola() {
    this.router.navigate(['/results'], { state: fakeState });
  }

  goToRegister() {
    this.router.navigateByUrl('/new-user');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}


