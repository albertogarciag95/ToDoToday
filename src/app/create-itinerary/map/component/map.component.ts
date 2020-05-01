import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../service/map.service';
import { Place } from 'src/app/shared/models/place';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() places: Place[];

  constructor(private map: MapService) { }

  ngOnInit():void {
    console.log("YEEEEEEEEEEEEEEEEEEEEEEEEEEEEe");
    this.map.buildMap(this.places);
  }

}
