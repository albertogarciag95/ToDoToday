import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nameFormControl = new FormControl('', [ Validators.required ]);
  userNameFormControl = new FormControl('', [ Validators.required ]);
  dateFormControl = new FormControl('date', [ Validators.required ]);
  emailFormControl = new FormControl('', [ Validators.required, Validators.email]);
  passFormControl = new FormControl('', [ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) ]);
  pass2FormControl = new FormControl('', [ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) ]);

  date: any;

  dateFilter = (date: Date | null): boolean => {
    return new Date() > date;
  }

  constructor() { }

  validateDate(pickerInput: string): string {
    if (!pickerInput.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/) || this.date > new Date()) {
      return 'Por favor, introduce una fecha con formato válido';
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
  }

  addNewUser(){}

  ngOnInit(): void {
  }

}
