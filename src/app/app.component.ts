import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { fakeState } from './shared/mocks/fake-state';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'todo-today';
  userLogged: string;
  userFile: SafeResourceUrl;

  private suscription: Subscription;

  constructor(private router: Router, private authService: AuthService, private sanitizer:DomSanitizer) {}

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
      currentUser => {
        const { name, file } = currentUser;
        this.userLogged = name ? name.split(" ")[0] : null;
        this.userFile = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + file);
      }
    )
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
}


