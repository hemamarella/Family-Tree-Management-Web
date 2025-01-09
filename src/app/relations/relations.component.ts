// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-relations',
//   templateUrl: './relations.component.html',
//   styleUrls: ['./relations.component.css']
// })
// export class RelationsComponent {

// }

import { ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberserviceService } from '../memberservice.service';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.css']
})
export class RelationsComponent implements OnInit {
  relationForm!: FormGroup;
  submitMessage: string = '';
  isSubmittedSuccessfully: boolean = false;
  displayModal: boolean = false;

  families: any[] = [];
  families1: any[] = [];// Holds family data with ID and Name
  parentMembers: any[] = [];
  childMembers: any[] = [];
  filteredChildMembers: any[] = [];  // To hold filtered list of child members based on selected parent
  relations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private memberService: MemberserviceService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadDropdownData();
    this.relationForm = this.fb.group({
      ParentFamilyId: ['', Validators.required],
      ParentMemberId: ['', Validators.required],
      ChildFamilyId: ['', Validators.required],
      ChildMemberId: ['', Validators.required],
      RelationId: ['', Validators.required],
    });

    // Watch for changes in ParentFamilyId and ChildFamilyId to fetch members accordingly
    // this.relationForm.get('ParentFamilyId')?.valueChanges.subscribe((parentFamilyId) => {
    //   this.loadMembersByFamilyId(parentFamilyId, 'parent');
    // });
    // this.relationForm.get('ChildFamilyId')?.valueChanges.subscribe((childFamilyId) => {
    //   this.loadMembersByFamilyId(childFamilyId, 'child');
    // });



  }

  loadDropdownData(): void {
    this.memberService.getFamilyNames().subscribe((data) => {
      this.families = data;
      this.families1 = data;// Populate family IDs and Names for Parent and Child
    });

    this.memberService.getRelations().subscribe((data) => {
      this.relations = data;  // Populate relations dropdown
    });
  }

  loadMembersByFamilyId(event: Event, type: string): void {
    const selectElement = event.target as HTMLSelectElement;
    const familyId = selectElement.value;
    console.log(familyId);
    if (type === 'parent') {
      this.memberService.getMemberNames(familyId, type).subscribe(
        (members) => {
          this.parentMembers = members; // Load parent members
        },
        (error) => {
          console.error(`Error loading ${type} members:`, error);
        }
      );
      
    }
    else {
      this.memberService.getMemberNames(familyId, type).subscribe(
        (members) => {
          this.childMembers = members; // Load child members
          this.filteredChildMembers = [...this.childMembers]; // Initially, show all child members
          console.log('childMembers', this.childMembers);
          console.log('filteredChildMembers', this.filteredChildMembers);
          if(this.relationForm.get('ParentMemberId')?.value){
            const pMemberId =this.relationForm.get('ParentMemberId')?.value;
            this.filterChildMembers(pMemberId);
          }
        },
        (error) => {
          console.error(`Error loading ${type} members:`, error);
        }
      );
    }
  }

  filterChildMembers(parentId:any): void {
    console.log("Selected Child Family Id:", parentId);
    console.log("Child Members:", this.childMembers); // Log child members before filtering

    this.filteredChildMembers = this.childMembers.filter(
      (member) => member.Id !== Number(parentId)
    );

    console.log("Filtered Child Members:", this.filteredChildMembers);
  }

  onSubmit(): void {
    this.relationForm.markAllAsTouched();

    if (this.relationForm.invalid) {

      this.submitMessage = 'Please fill out all required fields.';
      this.isSubmittedSuccessfully = false;
      return;
    }

    const formData = new FormData();

    Object.keys(this.relationForm.value).forEach((key)=> {
      formData.append(key, this.relationForm.value[key]);
    });



    // const jsonPayload = JSON.stringify(this.relationForm.value);

    this.memberService.AddMemberRelations(this.relationForm.value).subscribe(
      (response) => {
        console.log('Response:', response); // Debugging log
        this.submitMessage = 'Form successfully submitted!';
        this.isSubmittedSuccessfully = true;
        this.displayModal = true;
        this.relationForm.reset({
          ParentFamilyId:'',

          ParentMemberId: '',
          ChildFamilyId:'',

          ChildMemberId: '',
          RelationId: ''
        });
      },
      (error) => {
        console.error('Error:', error); // Debugging log
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
    this.relationForm.reset();  // First reset
    setTimeout(() => {
      this.relationForm.reset(
        {
          ParentFamilyId:'',
          ParentMemberId:'',
          ChildFamilyId:'',
          ChildMemberId:'',
          RelationId:'',
        }
      );  // Second reset after a small delay
    }, 0);
    this.submitMessage = '';
    this.isSubmittedSuccessfully = false;
  }
  
}