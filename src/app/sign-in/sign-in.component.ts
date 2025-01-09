// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-sign-in',
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.css']
// })
// export class SignInComponent {
//   signInForm: FormGroup = this.initForm();
//   errorMessage: string = '';

//   constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

//   private initForm(): FormGroup {
//     return this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       rememberMe: [false]
//     });
//   }

//   get f() {
//     return this.signInForm.controls;
//   }

//   onSubmit() {
//     if (this.signInForm.valid) {
//       const payload = {
//         email: this.signInForm.value.email,
//         password: this.signInForm.value.password
//       };

//       this.http.post('https://localhost:44310/api/auth/signin', payload).subscribe({
//         next: (response: any) => {
//           console.log(response)
//           localStorage.setItem('token', response.Token); 

//           localStorage.setItem('user', JSON.stringify(response.user));

//           this.errorMessage = '';
//           this.router.navigate(['/mainlayout']); 
//         },
//         error: (error: any) => {
//           this.errorMessage = error.error.message || 'Invalid login credentials.';
//         }
//       });
//     } else {
//       this.markFormGroupTouched(this.signInForm);
//     }
//   }

//   private markFormGroupTouched(formGroup: FormGroup) {
//     Object.values(formGroup.controls).forEach((control) => {
//       control.markAsTouched();
//       if (control instanceof FormGroup) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }
// }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup = this.initForm();
  errorMessage: string = '';
  successMessage: string = '';
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  private initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  get f() {
    return this.signInForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const payload = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password
      };

      this.http.post('https://localhost:44310/api/auth/signin', payload).subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.Token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.errorMessage = '';
          this.successMessage = 'Sign in successful!';
          setTimeout(() => this.router.navigate(['/mainlayout']), 1000);
        },
        error: (error: any) => {         
          this.errorMessage ='Invalid login credentials.';
          this.successMessage = '';
          this.clearMessagesAfterDelay();
        }
      });
    } else {
      this.markFormGroupTouched(this.signInForm);
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

  private clearMessagesAfterDelay(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 2000);
  }
}
