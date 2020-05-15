import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.css']
})
export class FormLocationComponent implements OnInit {

  @Input() title: string;
  @Input() state: string;

  location: string = 'Mi ubicación';

  constructor() { }

  openMapForSelectLocation() {
    console.log("not yet");
  }

  editField() {
    if (this.state !== 'active') {
      this.state = 'active';
    }
  }

  selectMyLocation() {
    console.log('not yet');
  }

  ngOnInit(): void {
  }

}
