import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() result: any;
  @Output() detailsChanged = new EventEmitter<any>();
  @Output() mapOptionChanged = new EventEmitter<any>();

  constructor() { }

  onSeeDetails(value) {
    this.detailsChanged.emit(value);
  }

  ngOnInit(): void {
  }

}
