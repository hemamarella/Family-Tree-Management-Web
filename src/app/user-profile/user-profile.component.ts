import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit  {
  isOpen = false;
  user = {
    username: '',
    email: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUserDetails();
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}
