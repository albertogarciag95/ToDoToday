import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/shared/models/place';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  places: any;
  results: any;
  optionSelected: any;
  totalDistance: number;
  userLocation: number[];
  searchParams: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(history.state);
    const { userLocation, results, searchParams } = history.state;
    if(!userLocation || !results || !searchParams) {
      this.router.navigateByUrl('/home');
    }

    this.searchParams = searchParams;
    this.userLocation = userLocation;
    this.results = results;
    this.places = [userLocation, ...Object.values(results[0])];
    this.searchParams = this.normalizeSearchParams(searchParams);
  }

  getTotalPrice(option) {
    return Object.values(option).reduce((acc: number, current: Place) => {
      return acc + current.price_per_person;
    }, 0);
  }

  normalizeSearchParams(searchParams) {
    const params = Object.values(searchParams);
    params.length--;

    return Object.values(params)
      .reduce((acc: string, searchParam: any, index) => {
        const { selected, price } = searchParam;
        if (selected) {
          if (price) {
            const { initRange, finalRange } = price;
            return `${acc} ${selected} (${initRange}-${finalRange}€) ${index !== params.length - 1 ? '+' : ''}`;
          }
          return `${acc} ${selected} ${index !== params.length - 1 ? '+' : ''}`;
        }
        return `${acc} ${new Date(searchParam).getDate()}/${new Date(searchParam).getMonth()}/${new Date(searchParam).getFullYear()} ${index !== params.length - 1 ? '+' : ''}`;
      }, '');
  }

  onOptionChanged({ index }) {
    this.places = [this.userLocation, ...Object.values(this.results[index])];
  }

}
