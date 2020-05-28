import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.css']
})

export class FormDateComponent implements OnInit {

  @Input() title: string;
  @Input() state: string;
  @Input() date: any;
  @Output() dateChange = new EventEmitter<any>();

  dateValue: string;

  filterSinceToday = (date: Date | null): boolean => {
    return new Date() < date;
  }

  constructor(private _adapter: DateAdapter<any>) {}

  onToggleToday(toggle) {
    if (toggle.checked) {
      this.dateChange.emit(new Date());
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
  }

  selectDate() {
    this.dateChange.emit(this.date._d);
  }

  onChangeDate($event) {
    this.dateValue = $event.target.value;
  }

  isDateInvalid() {
    return !this.date || !this.dateValue ||
      new Date() > new Date(this.dateValue) ||
      !this.dateValue.match(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1[0-9]|2[0-9]|3(0|1))\/\d{4}$/)
  }

  ngOnInit(): void {
    this._adapter.setLocale('es');
  }

}
