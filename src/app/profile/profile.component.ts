import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getUserInfo().subscribe(response => {
      console.log(response);
    });
  }

}
