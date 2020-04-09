import { Component, OnInit } from '@angular/core';
import { CreateItineraryService } from './create-itinerary.service';
import { Category } from '../shared/models/category';

@Component({
  selector: 'app-create-itinerary',
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.css']
})

export class CreateItineraryComponent implements OnInit {

  categories: Category[];

  constructor(private createItineraryService: CreateItineraryService) { }

  ngOnInit(): void {
    this.createItineraryService.getCategories().subscribe(
      (response: Category[]) => {
        console.log(response);
        this.categories = response
      });
  }

}
