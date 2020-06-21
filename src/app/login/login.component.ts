import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

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

  constructor(private router: Router, private userService: UserService) { }

  login() {
    if (!this.userFormControl.hasError('required') && !this.passFormControl.hasError('required')) {
      const body = {
        userName: this.userFormControl.value,
        password: this.passFormControl.value
      };

      this.userService.login(body)
        .subscribe(response => {
          if(response) {
            let isWrongLogin = !response.ok && !response.logged;
            this.userFormControl.setErrors(isWrongLogin ? { incorrect: isWrongLogin } : null);
            this.passFormControl.setErrors(isWrongLogin ? { incorrect: isWrongLogin } : null);
            this.showLoginError = isWrongLogin;
          }
        });
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/new-user');
  }

  ngOnInit(): void {
  }

}
