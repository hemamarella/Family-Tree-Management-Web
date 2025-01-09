// import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-change-password',
//   templateUrl: './change-password.component.html',
//   styleUrls: ['./change-password.component.css']
// })
// export class ChangePasswordComponent {
//   passwordData = {
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   };

//   showPassword = {
//     current: false,
//     new: false,
//     confirm: false
//   };

//   errorMessage = '';
//   successMessage = '';

//   constructor(private authService: AuthService, private router: Router) {}
  

//   onSubmit(): void {
//     if (
//       !this.passwordData.currentPassword ||
//       !this.passwordData.newPassword ||
//       !this.passwordData.confirmPassword
//     ) {
//       this.errorMessage = 'All fields are required.';
//       return;
//     }

//     if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
//       console.log(this.passwordData);
      
//       this.errorMessage = 'New password and confirm password do not match.';
//       return;
//     }

//     this.authService.changePassword(this.passwordData).subscribe({
//       next: (response) => {
//         console.log(this.passwordData);
//         this.successMessage = 'Password updated successfully.';
//         this.errorMessage = '';
//         alert('Password changed successfully!');
//         // setTimeout(() => this.router.navigate(['/profile']), 2000);
//       },
//       error: (error) => {
//         this.errorMessage = error.error || 'Failed to update password.';
//         this.successMessage = '';
//         alert(
//           error?.error?.message || 'An error occurred while changing the password.'
//         );
//       }
//   });
//   }

//   navigateToProfile() {
//     this.router.navigate(['dashboard']);
//   }
// }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  isLoading = false;

  showPassword = {
    current: false,
    new: false,
    confirm: false
  };

  errorMessage = '';
  successMessage = '';
  currentPassword: string='';
  newPassword: string='';
  confirmPassword:string='';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  get f() { return this.passwordForm.controls; }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.changePassword(this.passwordForm.value).subscribe({
        next: () => {
          this.successMessage = 'Password updated successfully!';
          setTimeout(() => this.router.navigate(['signin']), 2000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to update password.';
        },
        // complete: () => {
        //   this.isLoading = false;
        // }
      });
    } else {
      Object.keys(this.passwordForm.controls).forEach(key => {
        const control = this.passwordForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
