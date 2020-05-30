import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';
import { FormControl, Validators} from '@angular/forms';

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
  @ViewChild('currentElement') element: ElementRef;

  dateSummary: string;
  dateControl = new FormControl(
    'date', [ Validators.required ]
  );

  filterSinceToday = (date: Date | null): boolean => {
    return new Date() < date;
  }

  constructor(private adapter: DateAdapter<any>) {}

  onToggleToday(toggle) {
    if (toggle.checked) {
      this.dateChange.emit(new Date());
      this.dateSummary = 'Hoy';
      this.scrollDown();
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
  }

  selectDate() {
    this.dateChange.emit(this.date._d);
    const { date, month, year } = this.dateControl.value._i;
    this.dateSummary = `${String(date)}/${String(month + 1)}/${String(year)}`;
    this.scrollDown();
  }

  scrollDown() {
    this.state = 'completed';
    setTimeout(() => {
      this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 500);
  }

  validateDate(pickerInput: string): string {
    this.dateSummary = pickerInput;
    if (!pickerInput || pickerInput === '' ) {
      return 'Por favor, introduce una fecha';
    }
    if (!pickerInput.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/) || this.date < new Date()) {
      return 'Por favor, introduce una fecha con formato válido';
    }
    return '';
  }

  editField() {
    this.state = 'active';
  }

  ngOnInit(): void {
    this.adapter.setLocale('es');
  }

}
