import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapSelectDialog } from '../../dialogs/map-select-dialog/map-select-dialog';

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
  isMapOpened: boolean = false;
  myLocationChecked: boolean = false;

  constructor(public dialog: MatDialog) { }

  onSelectOtherPoint() {
    this.getMyLocation(this.openMapDialog.bind(this));
  }

  openMapDialog(position) {
    const dialogRef = this.dialog.open(MapSelectDialog, {
      width: '100%',
      data: {
        userLocation: [position.coords.longitude, position.coords.latitude]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userLocationChange.emit({ latitude: result[0], longitude: result[1] });
      this.state = 'completed';
    });
  }

  editField() {
    if (this.state !== 'active') {
      this.state = 'active';
    }
  }

  onToggleMyLocation(toggle) {
    if(toggle.checked) {
      this.getMyLocation(this.returnMyLocation.bind(this));
    } else {
      this.userLocationChange.emit(undefined);
    }
  }

  getMyLocation(successCallback) {
    if('geolocation' in navigator) {
      return navigator.geolocation.getCurrentPosition(
        successCallback,
        (error) => { throw new Error(error.message); },
        { enableHighAccuracy: true, timeout: 100000, maximumAge: 0 }
      );
    } else {
      throw new Error('Geolocation is not allowed in your navigator');
    }
  }

  returnMyLocation(position) {
    this.userLocationChange.emit({ latitude: position.coords.latitude, longitude: position.coords.longitude });
  }

  ngOnInit(): void {
  }

}
