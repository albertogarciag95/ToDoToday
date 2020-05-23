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

  @Output() selectedChange = new EventEmitter<any>();
  @ViewChild('currentElement') element: ElementRef;

  checkboxChecked: boolean;
  priceCheckboxChecked: boolean;
  price: Number;
  summary: any;

  prices = ["5€", "10€", "15€", "20€", "25€"]

  constructor() {}

  completeStep() {
    if(this.selected && (this.price || this.priceCheckboxChecked)) {
      this.state = 'completed';
      this.summary = { selected: this.selected, price: this.price };
      this.selectedChange.emit({ selected: this.selected, price: this.price });
      this.checkboxChecked = false;
      this.priceCheckboxChecked = false;

      setTimeout(() => {
        this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }, 100);
    }
  }

  onSkipCheckboxChecked(event) {
    if (event.checked) {
      this.selectedChange.emit('');
      setTimeout(() => {
        this.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }, 100);
    }
    if (!event.checked && this.selected) {
      this.selectedChange.emit({ selected: this.selected, price: this.price });
    }
    if (!event.checked && !this.selected) {
      this.selectedChange.emit(undefined);
    }
  }

  onPriceCheckboxChecked(event) {
    this.priceCheckboxChecked = event.checked;
    this.price = undefined;
    this.completeStep();
  }

  editField() {
    if (this.state !== 'active') {
      this.state = 'active';
      this.selected = undefined;
      this.price = undefined;
    }
  }

}
