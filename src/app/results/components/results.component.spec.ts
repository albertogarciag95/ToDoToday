import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    history.pushState({ "userLocation":{"latitude":40.46366700000001,"longitude":-3.7492199999999998},"results":[{"firstPlace":{"title":"Museo barato","description":"Bueno bonito y barato","category":"Cultura y sociedad","latitude":40.435298,"longitude":-3.709424,"location":"C, Costanilla de los Ángeles, 20","price_per_person":2,"__v":0,"img":"../../../assets/images/museo.jpg"},"lunchPlace":{"title":"Soda Bar","description":"Hamburguesas, burritos, patatas, buena cerveza...este sitio te sorprenderá","category":"Burguer","latitude":40.431839,"longitude":-3.712856,"location":"Calle de Rodríguez San Pedro, 44","price_per_person":12,"__v":0,"img":"../../../assets/images/burguer.jpg"},"secondPlace":{"title":"Sala Galileo Galilei","description":"Sala de conciertos emblemática del barrio de Chamberí. Consultar horarios en la web.","category":"Musica en directo","latitude":40.438463,"longitude":-3.709804,"location":"Calle de Galileo, 98","price_per_person":10,"__v":0,"img":"../../../assets/images/musicaendirecto.jpg"},"dinnerPlace":{"title":"El Sitio","description":"En plena zona universitaria. Los lunes hay buffet libre de pizza por tan solo 7 euros. Fantástica relación calidad precio.","category":"Pizza","latitude":40.435204,"longitude":-3.717446,"location":"Bajos de Moncloa, en Calle Fernandez de los Rios","price_per_person":10,"__v":0,"img":"../../../assets/images/pizza.jpg"}},{"firstPlace":{"title":"Museo caro","description":"Bueno bonito y caro","category":"Cultura y sociedad","latitude":40.433051,"longitude":-3.706117,"location":"C, Costanilla de los Ángeles, 20","price_per_person":22,"__v":0,"img":"../../../assets/images/museo.jpg"},"lunchPlace":{"title":"Clandestino Burguer","description":"Las paredes están decoradas por los propios clientes. Todas las mesas tienen rotuladores, animando a contribuir con la decoración. Buena relación calidad/precio.","category":"Burguer","latitude":40.433881,"longitude":-3.702546,"location":"Calle de Eloy Gonzalo, 12","price_per_person":13,"__v":0,"img":"../../../assets/images/burguer.jpg"},"secondPlace":{"title":"La Chocita del Loro Senator","description":"Espectáculos de humor y monólogos de la mano de artistas de Paramount Comedy.","category":"Musica en directo","latitude":40.422742,"longitude":-3.709495,"location":"C/ Gran Vía, 70","price_per_person":13,"__v":0,"img":"../../../assets/images/musicaendirecto.jpg"},"dinnerPlace":{"title":"NAP Chamberí","description":"Decoración artística y colorida","category":"Pizza","latitude":40.431965,"longitude":-3.702108,"location":"Calle del Cardenal Cisneros, 38","price_per_person":14,"__v":0,"img":"../../../assets/images/pizza.jpg"}}],"searchParams":{"date":"2020-07-02T22:00:00.000Z","category":{"selected":"Cultura y sociedad"},"secondCategory":{"selected":"Musica en directo"},"lunchCategory":{"selected":"Burguer","price":{"initRange":10,"finalRange":15}},"dinnerCategory":{"selected":"Pizza","price":{"initRange":10,"finalRange":15}},"userLocation":{"latitude":40.46366700000001,"longitude":-3.7492199999999998}},"navigationId":3}, 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
