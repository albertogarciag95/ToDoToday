import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  places: any;
  results: any;
  detailsSelected: any;

  constructor() { }

  ngOnInit(): void {
    console.log(history.state);
    const { userLocation, results} = history.state;
    this.results = results;
    this.places = this.getPlacesByResults(results, userLocation);
  }

  getPlacesByResults(results: any, userLocation: number[]) {
    return [
      userLocation,
      ...Object.values(results).map(({ place }) => place)
    ];
  }

}
