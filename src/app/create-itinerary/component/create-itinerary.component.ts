import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CreateItineraryService } from '../service/create-itinerary.service';

import { Category } from '../../shared/models/category';
import { Place } from 'src/app/shared/models/place';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-itinerary',
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.css']
})

export class CreateItineraryComponent implements OnInit {

  @ViewChild('results', { static: false }) results: ElementRef;
  @ViewChild('map', { static: false }) map: ElementRef;

  categories: Category[];
  firstOptionCategories: Category[];
  secondOptionCategories: Category[];
  lunchFoodCategories: Category[];
  dinnerFoodCategories: Category[];

  fieldStates: string[] = ['active', 'disabled', 'disabled', 'disabled'];

  itineraryForm = this.formBuilder.group({
    firstCategorySelected: [''],
    secondCategorySelected: [''],
    lunchCategorySelected: [''],
    dinnerCategorySelected: ['']
  });

  itineraryResult: any;
  places: Place[];
  buttonEnabled: boolean;
  isMapEnabled: boolean;


  constructor(private createItineraryService: CreateItineraryService, private formBuilder: FormBuilder, private changeDetector : ChangeDetectorRef) { }

  createItinerary() {
    const body = this.buildRequestBody(this.itineraryForm.controls)

    this.createItineraryService.createItinerary(body).subscribe(
      (response: any) => {
        this.itineraryResult = response;
        this.places = [
          ...response.categoryPlaces,
          ...response.secondCategoryPlaces,
          ...response.lunchPlaces,
          ...response.dinnerPlaces
        ];
        this.changeDetector.detectChanges();
        this.results.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });

        console.log(response);
      }, (error: any) => {
        console.error('ERROR: ', error);
      });
  }

  buildRequestBody(controls: any) {
    const {
      firstCategorySelected,
      secondCategorySelected,
      lunchCategorySelected,
      dinnerCategorySelected
    } = controls;

    return {
      category: firstCategorySelected.value,
      secondCategory: null,
      lunchCategory: lunchCategorySelected.value,
      dinnerCategory: dinnerCategorySelected.value
    }
  }

  onFirstCategoryChanges(value, index) {
    this.secondOptionCategories = this.firstOptionCategories.filter(category => category.name !== value);
    this.completeField(index);
  }

  onSecondCategoryChanges(value, index) {
    this.firstOptionCategories = this.secondOptionCategories.filter(category => category.name !== value);
    this.completeField(index);
  }

  getCategories(): void {
    this.createItineraryService.getCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        this.firstOptionCategories = this.categories.filter(category => category.isFoodType === false);
        this.secondOptionCategories = [...this.firstOptionCategories];
        this.lunchFoodCategories = this.categories.filter(category => category.isFoodType === true);
        this.dinnerFoodCategories = [...this.lunchFoodCategories];
      }, (error: any) => {
        console.error('ERROR: ', error);
      });
  }

  editField(index) {
    if(this.fieldStates[index] != 'active') {
      this.fieldStates[index] = 'active';
    }
  }

  completeField(index) {
    this.fieldStates[index] = 'completed';
    if(index + 1 < this.fieldStates.length) {
      this.editField(index + 1);
    }
  }

  onCheckNoSecondCategory(event) {
    if(event.checked) {
      this.itineraryForm.get('secondCategorySelected').setValue('none');
      this.fieldStates[2] = 'active';
    } else {
      this.itineraryForm.get('dinnerCategorySelected').setValue('')
    }
  }

  onCheckNoLunch(event) {
    if(event.checked) {
      this.itineraryForm.get('lunchCategorySelected').setValue('none');
      this.fieldStates[3] = 'active';
    } else {
      this.itineraryForm.get('dinnerCategorySelected').setValue('')
    }
  }

  onCheckNoDinner(event) {
    event.checked ?
      this.itineraryForm.get('dinnerCategorySelected').setValue('none'):
      this.itineraryForm.get('dinnerCategorySelected').setValue('')
  }

  areAllFieldsFilled() {
    const { controls } = this.itineraryForm;

    for(let id in controls) {
      if(controls[id].value === '') {
        return true;
      }
    }
  }

  enableMap() {
    this.isMapEnabled = true;
    this.changeDetector.detectChanges();
    this.map.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
