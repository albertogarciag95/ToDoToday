import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapSelectDialog } from '../../dialogs/map-select-dialog/map-select-dialog';
import { environment } from '../../../../../environments/environment';
import { MapService } from 'src/app/results/components/map/service/map.service';

@Component({
  selector: 'app-form-location',
  templateUrl: './form-location.component.html',
  styleUrls: ['./form-location.component.css']
})
export class FormLocationComponent implements OnInit {

  @Input() title: string;
  @Input() state: string;
  @Output() userLocationChange = new EventEmitter<any>();

  location = 'Mi ubicación';
  isMapOpened = false;
  myLocationChecked = false;

  constructor(public dialog: MatDialog, public service: MapService) { }

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
      this.location = result.location.split(', ')
        .filter(item => item !== environment.CITY && !environment.COUNTRY.includes(item))
        .join(', ');

      this.userLocationChange.emit({
        longitude: result.selected[0],
        latitude: result.selected[1],
        location: this.location
      });
      this.state = 'completed';
    });
  }

  editField() {
    if (this.state !== 'active') {
      this.state = 'active';
    }
  }

  onToggleMyLocation(toggle) {
    if (toggle.checked) {
      setTimeout(() => this.getMyLocation(this.returnMyLocation.bind(this)), 300);

    } else {
      this.userLocationChange.emit(undefined);
    }
  }

  getMyLocation(successCallback) {
    return navigator.geolocation.getCurrentPosition(
      successCallback,
      (error) => { throw new Error(error.message); }
      // { enableHighAccuracy: true, timeout: 100000, maximumAge: 0 }
    );
  }

  returnMyLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.service.getGeocoding([longitude, latitude]).subscribe(
      response => {
        const result = response.features[0].place_name;
        this.location = result.split(', ')
          .filter(item => item !== environment.CITY && !environment.COUNTRY.includes(item))
          .join(', ');

        this.userLocationChange.emit({ latitude, longitude: position.coords.longitude, location: this.location });
        this.state = 'completed';
      });

  }

  ngOnInit(): void {
  }

}
