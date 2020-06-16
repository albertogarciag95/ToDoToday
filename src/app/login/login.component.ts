import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  login() {}

  goToRegister() {
    this.router.navigateByUrl('/new-user');
  }

  ngOnInit(): void {
  }

}
