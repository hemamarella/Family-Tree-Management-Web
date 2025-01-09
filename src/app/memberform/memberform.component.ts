import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberserviceService } from '../memberservice.service';


@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.component.html',
  styleUrls: ['./memberform.component.css']
})
export class MemberformComponent implements OnInit{
  memberForm!: FormGroup;
  submitMessage: string = '';
  isSubmittedSuccessfully: boolean = false;
  displayModal: boolean = false;
  
  familyNames: any;
users: any;
maxDate: string;

  constructor(private fb: FormBuilder, private memberService: MemberserviceService) {

    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadFamilyNames();
    this.memberForm = this.fb.group({
      FamilyId: ['', Validators.required], 
      // UserId:[null], // Ensure this matches the form control in HTML
      FirstName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      // LastName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
      Gender: ['', Validators.required],
      DateOfBirth: ['', [Validators.required,this.dateOfBirthValidator()]],
      uploadedPhoto :[null],
      Photo: [null],
      
    });
    
  }
  dateOfBirthValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null; // Return valid if empty (required validator handles this)
  
      const date = new Date(value);
      const minDate = new Date('1900-01-01');
      const maxDate = new Date();
  
      if (date < minDate || date > maxDate) {
        return { invalidDate: true };
      }
      return null;
    };
  }
  
  

  loadFamilyNames(): void {
    this.memberService.getFamilyNames().subscribe(
      (data) => {
        this.familyNames = data;
        console.log(data);

      },
      (error) => {
        console.error('Error fetching family names:', error);
      }
    );
  }

 
 
  onFileChange(event: any): void {
    const file = event.target.files[0]; // Get the first file selected
    if (file) {
      // Validate file type
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        // Read the file and convert it to a base64 string
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          const base64Image = reader.result as string;
  
          const img = new Image();
          img.src = base64Image;
  
          img.onload = () => {
            // Set desired dimensions
            const width = 200; // Example: 300px
            const height = 200; // Example: 300px
  
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              console.error('Failed to get canvas context.');
              return;
            }
  
            canvas.width = width;
            canvas.height = height;
  
            // Draw the resized image on the canvas
            ctx.drawImage(img, 0, 0, width, height);
  
            // Convert the canvas to a base64 string
            const resizedBase64Image = canvas.toDataURL('image/png');
  
            // Set the resized base64 image string in the form control
            this.memberForm.patchValue({
              Photo: resizedBase64Image
            });
          };
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
  
  
  
  onSubmit(): void {
    this.memberForm.markAllAsTouched();
  
    // Check for invalid required fields only
    if (this.memberForm.invalid) {
      this.submitMessage = 'Please fill out all required fields.';
      this.isSubmittedSuccessfully = false;
      this.displayModal = true;
      return;
    }
  
    // Prepare form data
    const formData = new FormData();
    Object.keys(this.memberForm.value).forEach((key)=> {
      const value = this.memberForm.value[key];
      if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });
  
    this.memberService.AddFamilyMembers1(formData).subscribe(
      (response) => {
        console.log(formData);
        
        console.log('Response:', response);
        this.submitMessage = 'Form successfully submitted!';
        this.isSubmittedSuccessfully = true;
        this.displayModal = true;
        this.memberForm.reset({
          FamilyId:'',
          // UserId:'',
          Gender:'',
      });
      },
      (error) => {
        console.error('Error:', error);
        this.submitMessage = 'Error occurred while submitting the form.';
        this.isSubmittedSuccessfully = false;
        this.displayModal = true;
      }
    );
  }
  closeModal(): void {
      this.displayModal = false;
    }
    onClear(): void {
      this.memberForm.reset();
      setTimeout(() => {
        this.memberForm.reset(
          {
            FamilyId:'',
          // UserId:'',
          Gender:'',
          }
        );  // Second reset after a small delay
      }, 0);  // Reset the form values
      this.submitMessage = '';   // Clear any success/error messages
      this.isSubmittedSuccessfully = false;  // Reset submission status
    }
}
