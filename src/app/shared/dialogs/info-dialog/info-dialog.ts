import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.html',
  styleUrls: ['./info-dialog.css']
})
export class InfoDialog implements OnInit {

  title: string;
  description: string;
  image: string;
  buttonText: string;

  constructor(public dialogRef: MatDialogRef<InfoDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    const { status, error, userAdded } = this.data;
    if(userAdded) {
      this.showUserAddedDialog();
    }
    if(status && error) {
      this.showErrorDialog(status, error);
    }
  }

  showErrorDialog(status, error) {
    if (status === 0 ) {
      this.title = '¡Error de conexión!';
      this.description = 'Algo ha ido mal. Por favor revisa tu conexión e inténtalo más tarde.';
      this.image = '../../assets/images/wifi.png';
    } else if (status === 403) {
      this.title = 'Solo será un momento';
      this.description = 'Regístrate o inicia sesión si ya eres usuario de ToDoToday';
      this.image = '../../assets/images/route.png';
    } else if (status === 404 && error.includes('Itinerary not found')) {
      this.title = 'Lo sentimos :(';
      this.description = 'No hemos podido confeccionar un itinerario con esos parámetros. Por favor vuelve a intentarlo.';
      this.image = '../../assets/images/route.png';
    } else {
      this.title = '¡Vaya!';
      this.description = 'Lo sentimos, algo no ha ido bien. Vuelve a intentarlo más tarde.';
      this.image = '../../assets/images/sad.png';
    }
  }

  showUserAddedDialog() {
    this.title = '¡Enhorabuena!';
    this.description = 'Tu cuenta de ToDoToday se ha creado satisfactoriamente';
    this.buttonText = 'Iniciar sesión';
    this.image = '../../assets/images/success.png';
  }

  close() {
    this.dialogRef.close();
  }

}
