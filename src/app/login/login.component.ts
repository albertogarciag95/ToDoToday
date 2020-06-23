import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormControl = new FormControl('', [ Validators.required ]);
  passFormControl = new FormControl('', [ Validators.required ]);

  loginForm = new FormGroup({
    userFormControl: this.userFormControl,
    passFormControl: this.passFormControl
  });

  showLoginError: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    if (!this.userFormControl.hasError('required') && !this.passFormControl.hasError('required')) {
      const body = {
        userName: this.userFormControl.value,
        password: this.passFormControl.value
      };

      this.authService.login(body)
        .subscribe(response => {
          if(response) {
            this.handleValidations(response);
            this.authService.updateUserLogged(response.user);
            if(response.logged) {
              this.router.navigateByUrl('/home');
            }
          }
        });
    }
  }

  handleValidations(response) {
    let isWrongLogin = !response.ok && !response.logged;
    this.userFormControl.setErrors(isWrongLogin ? { incorrect: isWrongLogin } : null);
    this.passFormControl.setErrors(isWrongLogin ? { incorrect: isWrongLogin } : null);
    this.showLoginError = isWrongLogin;
  }

  goToRegister() {
    this.router.navigateByUrl('/new-user');
  }

  ngOnInit(): void {
  }

}
