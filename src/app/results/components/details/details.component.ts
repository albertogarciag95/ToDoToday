import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/shared/models/place';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Input() details: any;

  firstPlace: Place;
  secondPlace: Place;
  dinnerPlace: Place;
  lunchPlace: Place;

  @Input() totalDistance: number;
  @Input() totalPrice: any;

  constructor() { }

  ngOnInit(): void {
    const { firstPlace, secondPlace, dinnerPlace, lunchPlace } = this.details;
    this.firstPlace = this.setImage(firstPlace);
    this.secondPlace = this.setImage(secondPlace);
    this.dinnerPlace = this.setImage(dinnerPlace);
    this.lunchPlace = this.setImage(lunchPlace);
  }

  setImage(place): Place {
    let resultant = Object.assign(place,
      { img: '../../../assets/images/' + place.category.replace(/\s/g, '').toLowerCase() + '.jpg' });

    if (place.title.toLowerCase().includes('museo')) {
      resultant = Object.assign(place, { img: '../../../assets/images/museo.jpg' });
    }
    return resultant;
  }

}
