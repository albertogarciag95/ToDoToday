import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-form-selector',
  templateUrl: './form-selector.component.html',
  styleUrls: ['./form-selector.component.css']
})

export class FormSelectorComponent {

  @Input() state: string;
  @Input() listItems: any[];
  @Input() title: string;
  @Input() subtitle: string;
  @Input() selected: string;
  @Input() required: boolean;
  @Input() checkboxText: string;

  @Output() selectedChange = new EventEmitter<string>();
  @ViewChild('currentElement') element: ElementRef;

  checkboxChecked: boolean;

  constructor() {}

  onItemSelected(value) {
    this.state = 'completed';
    this.checkboxChecked = false;
    this.selectedChange.emit(value);
    setTimeout(() => {
      this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 100);
  }

  onCheckboxChecked(event) {
    if (event.checked) {
      this.selectedChange.emit('');
      setTimeout(() => {
        this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }, 100);
    }
    if (!event.checked && this.selected) {
      this.selectedChange.emit(this.selected);
    }
    if (!event.checked && !this.selected) {
      this.selectedChange.emit(undefined);
    }
  }

  editField() {
    if (this.state !== 'active') {
      this.state = 'active';
    }
  }

}
