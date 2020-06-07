import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  places: any;
  result: any;
  optionSelected: any;
  totalDistance: number;
  userLocation: number[];

  constructor() { }

  ngOnInit(): void {
    console.log(history.state);
    const { userLocation, result} = history.state;
    this.userLocation = userLocation;
    this.result = result;
    this.places = [userLocation, ...Object.values(result[0])]
  }

  onOptionChanged({ index }) {
    this.places = [this.userLocation, ...Object.values(this.result[index])];
  }

}
