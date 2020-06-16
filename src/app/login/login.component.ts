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

  constructor(private router: Router, private userService: UserService) { }

  login() {
    const body = {
      userName: this.userFormControl.value,
      password: this.passFormControl.value
    };

    this.userService.login(body)
      .subscribe(response => console.log("RESPONSE: ", response));
  }

  goToRegister() {
    this.router.navigateByUrl('/new-user');
  }

  ngOnInit(): void {
  }

}
