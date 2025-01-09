import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    username: '',
    email: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUserDetails();
  }


  onSubmit(): void {
    console.log('Profile update submitted:', this.user);
  }
}
