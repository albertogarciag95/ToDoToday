import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { fakeState } from './shared/mocks/fake-state';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'todo-today';
  userLogged: string;

  private suscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  hola() {
    this.router.navigate(['/results'], { state: fakeState });
  }

  goToRegister() {
    this.router.navigateByUrl('/new-user');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.suscription = this.authService.currentUser.subscribe(
      userLogged => this.userLogged = userLogged ? userLogged.split(" ")[0] : null
    )
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
}


