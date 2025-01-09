// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })
// export class SignUpComponent {
//   signUpData = {
//     firstName: '',
//     lastName: '',
//     gender: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   };

//   onSubmit() {
//     console.log('Sign up submitted:', this.signUpData);
//   }
// }










// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css'],
// })
// export class SignUpComponent {
//   signUpData = {
//     firstName: '',
//     lastName: '',
//     gender: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: '', // Admin, Editor, Viewer
//   };

//   constructor(private authService: AuthService, private router: Router) {}

//   onSubmit() {
//     if (this.signUpData.password !== this.signUpData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     this.authService.register(this.signUpData).subscribe({
//       next: () => {
//         alert('Registration successful!');
//         this.router.navigate(['/signin']);
//       },
//       error: (err) => {
//         alert(err.error || 'Registration failed.');
//       },
//     });
//   }
// }










// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PasswordValidators } from '../shared/validators/password';

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })
// export class SignUpComponent {
//   signUpForm: FormGroup = this.initForm();

//   constructor(private fb: FormBuilder) {}

//   private initForm(): FormGroup {
//     return this.fb.group({
//       firstName: ['', [Validators.required, Validators.minLength(2)]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [
//         Validators.required,
//         Validators.minLength(8),
//         PasswordValidators.pattern()
//       ]],
//       confirmPassword: ['', Validators.required]
//     }, {
//       validators: PasswordValidators.matchPasswords('password', 'confirmPassword')
//     });
//   }

//   get f() { return this.signUpForm.controls; }

//   onSubmit() {
//     if (this.signUpForm.valid) {
//       console.log('Sign up form submitted:', this.signUpForm.value);
//     } else {
//       this.markFormGroupTouched(this.signUpForm);
//     }
//   }

//   private markFormGroupTouched(formGroup: FormGroup) {
//     Object.values(formGroup.controls).forEach(control => {
//       control.markAsTouched();
//       if (control instanceof FormGroup) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }
// }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from '../shared/validators/password';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup = this.initForm();
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  private initForm(): FormGroup {
    return this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            PasswordValidators.pattern()
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: PasswordValidators.matchPasswords('password', 'confirmPassword')
      }
    );
  }

  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const payload = {
        username: this.signUpForm.value.username,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password
      };

      this.http.post('https://localhost:44310/api/auth/signup', payload).subscribe({
        next: (response: any) => {
          this.successMessage = 'Account created successfully!';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/signin']), 3000);
        },
        error: (error: any) => {
          this.errorMessage = error.error.message || 'Something went wrong.';
          this.successMessage = '';
        }
      });
    } else {
      this.markFormGroupTouched(this.signUpForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
