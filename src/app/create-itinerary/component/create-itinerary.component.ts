import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CreateItineraryService } from '../service/create-itinerary.service';

import { Category } from '../../shared/models/category';
import { Place } from 'src/app/shared/models/place';

@Component({
  selector: 'app-create-itinerary',
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.css']
})

export class CreateItineraryComponent implements OnInit {

  categories: Category[];
  firstOptionCategories: Category[];
  secondOptionCategories: Category[];

  firstCategorySelected: Category;
  secondCategorySelected: Category;
  places: Place[];

  constructor(private createItineraryService: CreateItineraryService) { }

  createItinerary() {
    const body = {
      category: this.firstCategorySelected
    };

    this.createItineraryService.createItinerary(body).subscribe(
      (response: Place[]) => {
        this.places = response;
        console.log(response);
      }, (error: any) => {
        console.error('ERROR: ', error);
      });
  }

  onFirstCategoryChanges(value) {
    this.secondOptionCategories = this.categories.filter(category => category.name !== value.name);
    this.firstCategorySelected = this.categories.find(category => category.name === value);
  }

  onSecondCategoryChanges(value) {
    this.firstOptionCategories = this.categories.filter(category => category.name !== value.name);
    this.secondCategorySelected = this.categories.find(category => category.name === value);
  }

  getCategories(): void {
    this.createItineraryService.getCategories().subscribe(
      (response: Category[]) => {
        console.log(response);
        this.categories = response;
        this.firstOptionCategories = [...this.categories];
        this.secondOptionCategories = [...this.categories];
      }, (error: any) => {
        console.error('ERROR: ', error);
      });
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
