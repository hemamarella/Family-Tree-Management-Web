// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-family',
//   templateUrl: './family.component.html',
//   styleUrls: ['./family.component.css']
// })
// export class FamilyComponent {

// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberserviceService } from '../memberservice.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent {
 
  familyForm!: FormGroup;
  submitMessage: string = '';
  isSubmittedSuccessfully: boolean = false;
  familyMembers: any[] = []; 
  today!: string; // Tell TypeScript this will be assigned in the constructor
  displayModal: boolean = false;


  constructor(
    private fb: FormBuilder,
 private memberService: MemberserviceService,
 private authService: AuthService  ) {}

  ngOnInit(): void {
    const now = new Date(); // Current date

    this.today = now.toISOString().split('T')[0]; // Format as 'yyyy-MM-dd'

    const today = new Date(); // Get current date
    const todayTimestamp = today.getTime(); // Get timestamp for today
    const minDate = new Date('1900-01-01'); // Minimum date
    const minDateTimestamp = minDate.getTime(); // Get timestamp for minimum date
  
    const user = this.authService.getUserDetails();
    

    // Initialize the form
    this.familyForm = this.fb.group({
      Id : null,
      username: [{ value: '', disabled: true }],  // Disabled because it's read-only
      Surname: ['', [Validators.required], [this.surnameValidator.bind(this)]],
      Color: ['', Validators.required],
      Description: [''],
      HeadOfTheFamily: ['', Validators.required],
      DOB: [
        '',
        [
          Validators.required,
          this.minDateValidator(minDateTimestamp),
          this.maxDateValidator(todayTimestamp),
          this.fourDigitYearValidator(), // Add the new validator here
        ],
      ],
      
      Gender: ['', Validators.required],
      FamilyHeadImage: [null], // The photo input field (initially null),
      FamilyHeadImageDefault: [null]
    });



    
    this.familyForm.patchValue({
      username: user.username,
    email: user.email
    });

  }

  fourDigitYearValidator() {
    return (control: any) => {
      if (control.value) {
        const year = new Date(control.value).getFullYear();
        if (year < 1000 || year > 9999) {
          return { invalidYear: true }; // Error object for invalid year
        }
      }
      return null; // No error
    };
  }

  // Custom Validator for min date (after January 1, 1900)
  minDateValidator(minDate: number) {
    return (control: any) => {
      if (control.value && new Date(control.value).getTime() < minDate) {
        return { min: true };  // Error object for min validation
      }
      return null;  // No error
    };
  }

  // Custom Validator for max date (before today's date)
  maxDateValidator(maxDate: number) {
    return (control: any) => {
      if (control.value && new Date(control.value).getTime() > maxDate) {
        return { max: true };  // Error object for max validation
      }
      return null;  // No error
    };
  }



  // Handle file selection, convert the image to Base64, and update the form control
  onFileChange(event: any): void {
    const file = event.target.files[0]; // Get the first file selected
    if (file) {
      // Validate file type
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        // Read the file and convert it to a base64 string
        reader.readAsDataURL(file);

        reader.onload = () => {
          const base64Image = reader.result as string; // Get the base64 string of the image
          console.log(base64Image);
          
          // Set the base64 image string in the form control
          this.familyForm.patchValue({
            FamilyHeadImage: base64Image
          });
        };

        reader.onerror = (error) => {
          console.error('Error reading file:', error);
          alert('Error reading file.');
        };
      } else {
        alert('Please select a valid image file.');
      }
    }
  }

  

  surnameValidator(control: any) {
    return this.memberService.checkSurnameExists(control.value).then((isExist: boolean) => {
      return isExist ? { surnameTaken: true } : null;
    });
  }

  

  // Method to handle form submission
  onSubmit(): void {
    this.familyForm.markAllAsTouched();

    if (this.familyForm.invalid) {
      this.submitMessage = 'Please fill out all required fields.';
      this.isSubmittedSuccessfully = false;
      this.displayModal = true;
      return;
    }
    

    const formData = new FormData();

    // Append form values (excluding the base64 image) to formData
    Object.keys(this.familyForm.value).forEach((key) => {
      if (key !== 'FamilyHeadImage') {
        formData.append(key, this.familyForm.value[key]);
      }
    });

    // Handle the base64 image
    const base64Image = this.familyForm.get('FamilyHeadImage')?.value;
    if (base64Image) {
      formData.append('FamilyHeadImage', base64Image); // Append the base64 image string to FormData
      console.log('Base64 image:', base64Image);
    }

    // Get the head of the family icon and append it to the form data
    // const icon = this.getIconBasedOnName(this.familyForm.get('Headofthefamily')?.value);
    // formData.set('Headofthefamily', icon);
    
    // Send the form data to the backend
    this.memberService.postFamilyMemberDetails1(formData).subscribe(
      (response) => {
        this.submitMessage = 'Form successfully submitted!';
        this.isSubmittedSuccessfully = true;
        this.displayModal = true;
        console.log('Response:', response);
      },
      (error) => {
        this.submitMessage = 'Error occurred while submitting the form.';
        this.isSubmittedSuccessfully = false;
        this.displayModal = true;
        console.error('Error:', error);
      }
    );
    console.log(formData);
    
  }

  onClear(): void {
    this.familyForm.reset();  // Reset the form values
    this.submitMessage = '';   // Clear any success/error messages
    this.isSubmittedSuccessfully = false;  // Reset submission status
  }
  

  closeModal(): void {
    this.displayModal = false;
  }
  

   }
  


