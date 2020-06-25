import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

import { fakeState } from '../shared/mocks/fake-state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private suscription: Subscription;
  userLogged: string;
  userFile: SafeResourceUrl;

  constructor(private router: Router, private authService: AuthService, private sanitizer: DomSanitizer) {}

  hola() {
    this.router.navigate(['/results'], { state: fakeState });
  }

  goToRegister() {
    this.router.navigateByUrl('/new-user');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }

  ngOnInit(): void {
    this.suscription = this.authService.currentUser.subscribe(
      currentUser => {
        const { name, file } = currentUser;
        this.userLogged = name ? name.split(' ')[0] : null;
        this.userFile = file ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + file) : null;
      }
    );
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
