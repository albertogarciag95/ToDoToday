import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/shared/models/place';
import { Router } from '@angular/router';
import { ResultsService } from '../service/results.service';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialog } from 'src/app/shared/dialogs/info-dialog/info-dialog';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  mapPlaces: any;
  results: any;
  optionSelected: any;
  totalDistance: number;
  totalPrice: any;
  userLocation: number[];
  searchParams: any;
  itineraryDate: string;
  currentOption: number;

  constructor(private router: Router, public dialog: MatDialog, private service: ResultsService) { }

  ngOnInit(): void {
    console.log(history.state);
    const { userLocation, results, searchParams } = history.state;
    if(!userLocation || !results || !searchParams) {
      this.router.navigateByUrl('/home');
    }

    this.currentOption = 0;
    this.userLocation = userLocation;
    this.results = results;
    this.mapPlaces = [userLocation, ...Object.values(results[this.currentOption])];
    this.itineraryDate = searchParams.date;
    this.searchParams = this.normalizeSearchParams(searchParams);
  }

  getTotalPrice(option) {
    this.totalPrice = Object.values(option).reduce((acc: number, current: Place) => {
      return acc + current.price_per_person;
    }, 0);

    return this.totalPrice;
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
        return `${acc} ${this.convertDateToString(searchParam)} ${index !== params.length - 1 ? '+' : ''}`;
      }, '');
  }

  startItinerary() {
    const body = {
      places: Object.values(this.results[this.currentOption]),
      startPoint: 'test',
      totalPrice: this.totalPrice,
      totalDistance: this.totalDistance
    };
    this.service.startItinerary(body)
      .subscribe(() => {
        const itineraryRatingDate = new Date(this.itineraryDate).setDate(new Date(this.itineraryDate).getDate() + 1);
        const itineraryRatingDateString = this.convertDateToString(itineraryRatingDate);
        this.dialog.open(InfoDialog, { width: '650px', data: { date: itineraryRatingDateString } });
      });
  }

  convertDateToString(date) {
    return `${new Date(this.itineraryDate).getDate()}/${new Date(this.itineraryDate).getMonth()}/${new Date(this.itineraryDate).getFullYear()}`;
  }

  onOptionChanged({ index }) {
    this.currentOption = index;
    this.mapPlaces = [this.userLocation, ...Object.values(this.results[index])];
  }

}
