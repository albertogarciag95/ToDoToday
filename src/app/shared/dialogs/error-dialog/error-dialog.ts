import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.html',
  styleUrls: ['./error-dialog.css']
})
export class ErrorDialog implements OnInit {

  title: string;
  description: string;
  image: string;

  constructor(public dialogRef: MatDialogRef<ErrorDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const { status, error } = this.data;
    if(status === 0 ) {
      this.title = '¡Error de conexión!';
      this.description = 'Algo ha ido mal. Por favor revisa tu conexión e inténtalo más tarde.';
      this.image = '../../assets/images/wifi.png';
    } else if(status === 404 && error.includes('Itinerary not found')) {
      this.title = 'Lo sentimos :(';
      this.description = 'No hemos podido confeccionar un itinerario con esos parámetros. Por favor vuelve a intentarlo.';
      this.image = '../../assets/images/route.png';
    } else {
      this.title = '¡Vaya!';
      this.description = 'Lo sentimos, algo no ha ido bien. Vuelve a intentarlo más tarde.';
      this.image = '../../assets/images/sad.jpg';
    }
  }

  close() {
    this.dialogRef.close();
  }

}
