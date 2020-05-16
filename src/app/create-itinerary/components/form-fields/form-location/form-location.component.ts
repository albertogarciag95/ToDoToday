import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.css']
})
export class FormLocationComponent implements OnInit {

  @Input() title: string;
  @Input() state: string;
  @Output() userLocationChange = new EventEmitter<any>();

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
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userLocationChange.emit({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      }, (error) => {
        throw new Error(error.message);
      });
    } else {
      throw new Error('Geolocation is not allowed in your navigator');
    }
  }

  ngOnInit(): void {
  }

}
