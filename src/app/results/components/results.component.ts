import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    console.log(history.state);
    const { userLocation, result} = history.state;
    this.optionSelected = result[0];
    this.places = [userLocation, ...Object.values(this.optionSelected)]
  }

}
