import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { User } from '../shared/models/user';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  itineraries: any[];
  userName: string;
  name: string;
  email: string;
  birthDate: string;
  userImage: SafeResourceUrl;
  displayedColumns: string[] = ['Fecha de inicio', 'Punto de inicio', 'Lugares', 'Distancia', 'Precio', 'Valoración'];

  constructor(private profileService: ProfileService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.profileService.getUserInfo().subscribe((response: User) => {
      const { itineraries, userName, name, email, birthDate, userImage } = response;
      console.log(response);
      this.itineraries = itineraries;
      this.userName = userName;
      this.name = name;
      this.email = email;
      this.birthDate = this.convertDateToString(birthDate);
      this.userImage = userImage ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + userImage) : null;
    });
  }

  convertDateToString(date) {
    return `${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()}`;
  }

}
