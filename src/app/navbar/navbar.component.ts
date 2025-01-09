import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // isMenuOpen = false;
  // isDropdownOpen = false;
 
  // isSidebarOpen: boolean = false;

  // toggleDropdown(event: Event): void {
  //   event.preventDefault();
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }
  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
