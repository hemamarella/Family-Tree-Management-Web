// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-forgot-password',
//   templateUrl: './forgot-password.component.html',
//   styleUrls: ['./forgot-password.component.css']
// })
// export class ForgotPasswordComponent {
//   email: string = '';

//   onSubmit(): void {
//     console.log('Reset password requested for:', this.email);
//     // Implement password reset logic here
//   }
// }


import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (!this.email) {
      this.errorMessage = 'Please enter your email.';
      this.clearMessagesAfterDelay();
      return;
    }

    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        if(response.message.includes('Password reset link has been sent to your email.'))
          this.successMessage = response.message;
        else
        this.errorMessage = response.message;
        this.email = '';
        this.clearMessagesAfterDelay();
      },
      (error) => {
        this.errorMessage = 'Failed to send password reset link. Please try again.';
        this.successMessage = '';
        this.email = '';
        this.clearMessagesAfterDelay();
      }
    );
  }

  private clearMessagesAfterDelay(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 2000);
  }
}
