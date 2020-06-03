import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-today';

  constructor(private router: Router) {}

  hola() {
    this.router.navigate(['/results'], { state: {"userLocation":{"latitude":40.46366700000001,"longitude":-3.7492199999999998},"result":[{"firstPlace":{"place":{"title":"CaixaForum Madrid","description":"Eventos, salas de arte y exhibiciones","category":"5ea097a26fdd304f15fc0ba8","latitude":40.411128,"longitude":-3.69346,"location":"Paseo del Prado, 36","price_per_person":5,"__v":0},"distance":7511},"lunchPlace":{"place":{"title":"Bentley's burguer","description":"Hamburguesería en el corazón de Madrid, en las inmediaciones del parque del retiro.","category":"5ea098526fdd304f15fc0bac","latitude":40.421822,"longitude":-3.682806,"location":"Calle de Alcalá, 105","price_per_person":15,"__v":0},"distance":1493},"secondPlace":{"place":{"title":"Café Berlín","description":"Sala de conciertos en la que predomina la música rock-indie. Consultar horarios en la web.","category":"5ea097b96fdd304f15fc0ba9","latitude":40.419593,"longitude":-3.707943,"location":"C, Costanilla de los Ángeles, 20","price_per_person":10,"__v":0},"distance":2148},"dinnerPlace":{"place":{"title":"NAP Chamberí","description":"Decoración artística y colorida","category":"5ea098636fdd304f15fc0bad","latitude":40.431965,"longitude":-3.702108,"location":"Calle del Cardenal Cisneros, 38","price_per_person":14,"__v":0},"distance":1460}}],"navigationId":4}});
  }
}


