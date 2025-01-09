// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-reset-password',
//   templateUrl: './reset-password.component.html',
//   styleUrls: ['./reset-password.component.css']
// })
// export class ResetPasswordComponent {

// }

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Retrieve the token from the query string in the URL
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.errorMessage = 'Invalid or missing token.';
    }
  }

  onSubmit(): void {
    // Basic validation
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Both fields are required.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (!this.token) {
      this.errorMessage = 'Invalid or missing token.';
      return;
    }

    // Call the AuthService to handle the password reset
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: (response) => {
        // Handle successful password reset
        this.successMessage = 'Password has been reset successfully.';
        this.errorMessage = '';
        // Redirect to the Sign In page after a delay
        setTimeout(() => this.router.navigate(['/signin']), 3000);
      },
      error: (error) => {
        // Handle errors returned from the backend
        console.error('Error resetting password:', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Failed to reset password. Please try again.';
        }
        this.successMessage = '';
      },
    });
  }
}
