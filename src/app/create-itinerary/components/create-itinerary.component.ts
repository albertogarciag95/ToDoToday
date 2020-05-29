import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CreateItineraryService } from '../service/create-itinerary.service';

import { Category } from '../../shared/models/category';
import { Place } from 'src/app/shared/models/place';

@Component({
  selector: 'app-create-itinerary',
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.css']
})

export class CreateItineraryComponent implements OnInit {

  @ViewChild('details', { static: false }) details: ElementRef;
  @ViewChild('options', { static: false }) options: ElementRef;
  @ViewChild('map', { static: false }) map: ElementRef;

  dateTitle = '1. ¿Cuándo empieza tu itinerario?';
  firstCategoryTitle = '2. ¿Qué te apetece hacer?';
  secondCategoryTitle = '3. ¿Te gustaría hacer alguna otra cosa?';
  lunchCategoryTitle = '4. ¿Qué te apetece comer?';
  dinnerCategoryTitle = '5. ¿Qué te apetece cenar?';
  locationTitle = '6. ¿Dónde empieza tu itinerario?';

  firstCategorySubtitle = 'Selecciona una categoría y el precio que estás dispuesto a gastar (por persona)';
  secondCategorySubtitle = '¡El día es muy largo! ¿Por qué no exprimirlo al máximo?';

  dateSelected: Date;
  firstCategorySelected: any;
  secondCategorySelected: any;
  lunchCategorySelected: any;
  dinnerCategorySelected: any;

  firstOptionCategories: Category[];
  secondOptionCategories: Category[];
  lunchFoodCategories: Category[];
  dinnerFoodCategories: Category[];
  foodCategories: Category[];
  noFoodCategories: Category[];

  secondaryListItems = ['Entre 5€ y 10€', 'Entre 10€ y 15€', 'Entre 10€ y 20€', 'Entre 20€ y 25€'];
  priceItems = ['Nada', 'Entre 0€ y 5€', 'Entre 5€ y 10€', 'Entre 10€ y 15€', 'Entre 10€ y 20€', 'Entre 20€ y 25€'];

  fieldStates: string[] = ['active', 'disabled', 'disabled', 'disabled', 'disabled'];
  userLocation: any;

  itineraryResult: any;

  detailsSelected: any;
  mapOptionSelected: any;
  mapPlaces: any;


  constructor(private createItineraryService: CreateItineraryService, private changeDetector: ChangeDetectorRef) { }

  createItinerary() {
    const body = this.buildRequestBody();

    this.createItineraryService.createItinerary(body).subscribe(
      (response: any) => {
        console.log(response);
        this.itineraryResult = response;
        this.changeDetector.detectChanges();
        this.options.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, (error: any) => {
        console.error('ERROR: ', error);
      });
  }

  buildRequestBody() {
    return {
      category: this.handlePrice(this.firstCategorySelected),
      secondCategory: this.handlePrice(this.secondCategorySelected),
      lunchCategory: this.handlePrice(this.lunchCategorySelected),
      dinnerCategory: this.handlePrice(this.dinnerCategorySelected),
      userLocation: this.userLocation
    };
  }

  onFirstCategoryChanges(selectedItem) {
    this.secondOptionCategories = this.noFoodCategories.filter(category => category.name !== selectedItem.selected);
    this.fieldStates[1] = 'active';
  }

  onSecondCategoryChanges(selectedItem) {
    this.firstOptionCategories = this.noFoodCategories.filter(category => category.name !== selectedItem.selected);
    this.fieldStates[2] = 'active';
  }

  handlePrice(category) {
    const { price } = category;
    if (!price) {
      return {...category};
    }
    if (price === 'Nada') {
      return Object.assign(category, { price: { initRange: 0, finalRange: 0 }});
    }
    const priceRange = price.split(' ').map(item => Number(item.substring(0, item.length - 1)));
    return Object.assign(category, { price: { initRange: priceRange[1], finalRange: priceRange[3] }});
  }

  getCategories(): void {
    this.createItineraryService.getCategories().subscribe(
      (response: Category[]) => {
        this.noFoodCategories = response.filter(category => category.isFoodType === false);
        this.foodCategories = response.filter(category => category.isFoodType === true);

        this.secondOptionCategories = this.firstOptionCategories = [...this.noFoodCategories];
        this.dinnerFoodCategories = this.lunchFoodCategories = [...this.foodCategories];

      }, (error: any) => {
        console.error('ERROR: ', error);
      });
  }

  areAllFieldsFilled() {
    return !(
      this.firstCategorySelected !== undefined &&
      this.secondCategorySelected !== undefined &&
      this.lunchCategorySelected !== undefined &&
      this.dinnerCategorySelected !== undefined &&
      this.userLocation !== undefined
    );
  }

  enableMap(option) {
    this.mapOptionSelected = option;
    this.mapPlaces = this.translateToPlaces(this.mapOptionSelected);
    this.changeDetector.detectChanges();
    this.map.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  showItineraryDetails(details) {
    this.detailsSelected = details;
    this.changeDetector.detectChanges();
    this.details.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  translateToPlaces(places: any) {
    return [
      this.userLocation,
      ...Object.values(places).map(({ place }) => place)
    ];
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
