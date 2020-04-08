import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-itinerary',
  templateUrl: './create-itinerary.component.html',
  styleUrls: ['./create-itinerary.component.css']
})

export class CreateItineraryComponent implements OnInit {

  foods: string[] = ["hola", "hola2", "hola3"];

  constructor() { }

  ngOnInit(): void {
  }

}
