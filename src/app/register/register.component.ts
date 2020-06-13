import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  date: any;
  userFileImage: File;
  userFileSrc: any;
  nameFormControl = new FormControl('', [ Validators.required ]);
  userNameFormControl = new FormControl('', [ Validators.required ]);
  dateFormControl = new FormControl('date', [ Validators.required ]);
  emailFormControl = new FormControl('', [ Validators.required, Validators.email]);
  passFormControl = new FormControl('',
    [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      this.checkPasswords.bind(this)
    ]);
  pass2FormControl = new FormControl('',
  [
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    this.checkPasswords.bind(this)
  ]);

  registerForm = new FormGroup({
    nameFormControl: this.nameFormControl,
    userNameFormControl: this.userNameFormControl,
    dateFormControl: this.dateFormControl,
    emailFormControl: this.emailFormControl,
    passFormControl: this.passFormControl,
    pass2FormControl: this.pass2FormControl
  });

  dateFilter = (date: Date | null): boolean => {
    return new Date() > date;
  }

  constructor(private userService: UserService) { }

  addNewUser() {
    if(this.registerForm.valid) {
      const body: User = {
        name: this.registerForm.controls['nameFormControl'].value,
        userName: this.registerForm.controls['userNameFormControl'].value,
        birthDate: this.registerForm.controls['dateFormControl'].value,
        email: this.registerForm.controls['emailFormControl'].value,
        password: this.registerForm.controls['passFormControl'].value,
        image: this.userFileImage
      }

      this.userService.addNewUser(body).subscribe(
        response => {
          console.log("YAAAAY", response);
        }
      )
    }
  }

  validateDate(pickerInput: string): string {
    if (!pickerInput.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/) || this.date > new Date()) {
      return 'Por favor, introduce una fecha con formato válido';
    }
  }

  checkPasswords(control: FormControl) {
    if(this.registerForm) {
      let pass2 = control.value;
      let pass = this.passFormControl.value;

      return (pass !== pass2 && pass && pass2) ? { notSame: true } : null;
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
  }

  onFileChanged(event) {
    this.userFileImage = event.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(this.userFileImage);
    reader.onload = (_event) => {
      this.userFileSrc = reader.result;
    }
  }

  ngOnInit(): void {

  }

}
