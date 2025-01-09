// import { Component } from '@angular/core';
// import { GridviewService } from '../gridview.service';


// @Component({
//   selector: 'app-gridview',
//   templateUrl: './gridview.component.html',
//   styleUrls: ['./gridview.component.css']
// })
// export class GridviewComponent {

  import { Component } from '@angular/core';
  import { HttpErrorResponse } from '@angular/common/http';
  import { formatDate } from '@angular/common';
  import { GridviewService } from '../gridview.service';
  
  @Component({
    selector: 'app-gridview',
    templateUrl: './gridview.component.html',
    styleUrls: ['./gridview.component.css'],
  })
  export class GridviewComponent {
    expandedRow: number | null = null; // Tracks parent table expanded row
    expandedSubRow: number | null = null; // Tracks child table expanded row
    isEditFormVisible: boolean = false;
    isEditFormVisible1: boolean = false;
    isEditFormVisible2: boolean = false;
    loading = false;
    familyMembers: any[] = [];
    selectedMember: any = null;
    
    // Sample data structure
    lookups = [
      {
        Id: 1, // Changed to number
        Surname: '',
        Color: '',
        Description: '',
        CreatedDate: '',
        CreatedBy: '',
        Members: [
          {
            Id: 1,
            Photo: '', // Changed to number
            FirstName: '',
            LastName: '',
            Gender: '',
            DateOfBirth: '',
            CreatedDate: '',
            CreatedBy: '',
            Relationships: [
              {
                Id: 1, // Changed to number
                ParentMemberId: 1, // Changed to number
                ChildMemberId: 2, // Changed to number
                RelationId: 1, // Changed to number
                RelationName: ''
              },
            ],
          },
        ],
      },
    ];
    familyNames: any;
    editData: any = {};
    editData1: any = {};
    editData2: any = {};
    http: any;
  
  
    toggleExpand(index: number): void {
      this.expandedRow = this.expandedRow === index ? null : index;
      // this.expandedSubRow = null; // Reset sub-row expansion
    }
  
    toggleSubExpand(index: number): void {
      this.expandedSubRow = this.expandedSubRow === index ? null : index;
    }
  
    selectMember(memberId: number) {
      this.selectedMember = this.familyMembers.find(member => member.Id === memberId);
    }
    deleteParent(parentId: number): void {
      if (confirm('Are you sure you want to delete this Family and all related data?')) {
  
        this.familytreeService.deleteFamily(parentId).subscribe({
          next: (response: any) => {
            console.log(response.message);
            this.lookups = this.lookups.filter((lookup) => lookup.Id !== parentId);
            alert('Family and related data deleted successfully.');
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error deleting family:', error.message);
            alert('Failed to delete. Please check your network or try again.');
          },
        });
      }
  
    }
  
    deleteRelation(id: number): void {
      if (id == null || id === undefined) {
        console.error('Invalid id:', id);  // Ensure id is valid before proceeding
        return;
      }
  
  
      console.log('Attempting to delete with ID:', id);  // Check the ID value
      this.familytreeService.deleteRelation(id).subscribe({
        next: (response) => {
          console.log('Deleted successfully:', response);
        },
        error: (error) => {
          console.error('Error deleting family:', error);
        }
      });
    }
  
    // deleteChild(parentIndex: number, childId: number): void {
    //   const parent = this.lookups[parentIndex];
    //   parent.Members = parent.Members.filter((member) => member.Id !== childId);
    // }
  
  
    deleteMember(parentIndex: number, childId: number): void {
      if (confirm('Are you sure you want to delete this member and all related data?')) {
        this.familytreeService.deleteMember(childId).subscribe({
          next: () => {
            const parent = this.lookups[parentIndex];
            parent.Members = parent.Members.filter((member) => member.Id !== childId);
            alert('Member and related data deleted successfully.');
          },
          error: (err: any) => {
            console.error('Error deleting member:', err);
            alert('An error occurred while deleting the member.');
          },
        });
      }
    }
  
  
    deleteSubChild(parentIndex: number, childIndex: number, subChildId: number): void {
      const child = this.lookups[parentIndex].Members[childIndex];
      child.Relationships = child.Relationships.filter((relation) => relation.ChildMemberId !== subChildId);
    }
  
  
  
  
  
  
  
  
  
  
  
  
    constructor(
      private familytreeService: GridviewService
    ) { }
    ngOnInit(): void {
      this.loadFamilyNames();
    }
  
    loadFamilyNames(): void {
      this.familytreeService.getFamilyNames1().subscribe(
        (data: any) => {
          console.log('API Response:', data);
          this.lookups = data; // Bind data to lookups
          console.log(this.lookups);
          
        },
        (error: any) => {
          console.error('Error fetching family names:', error);
        }
      );
    }
  
    onSubmit(): void {
      if (this.isEditFormVisible) {
        this.updateData(); // Call the update method
        this.closeEditForm(); // Close the modal
      }
    }
  
    onSubmitMemberForm(): void {
      if (this.isEditFormVisible1) {
        this.updateData1(); // Call the method to save changes
        this.closeEditForm1(); // Close the modal after submission
      }
    }
  
  
  
    openEditForm(row: any): void {
      console.log(row);
  
      this.isEditFormVisible = true;
      this.isEditFormVisible1 = false;
      this.editData = { ...row }; // Clone the row data to avoid mutating directly
  
    }
    openEditForm1(row: any): void {
      console.log(row);
  
      this.isEditFormVisible1 = true;
      this.isEditFormVisible = false;
      row.DateOfBirth = row.DateOfBirth ? formatDate(new Date(row.DateOfBirth),'yyyy-MM-dd','en') : null
      this.editData1 = { ...row }; // Clone the row data to avoid mutating directly
      console.log(this.editData1);
  
    }
    openEditForm2(row: any): void {
      console.log(row);
      this.isEditFormVisible2 = true;
      this.isEditFormVisible1 = false;
      this.isEditFormVisible = false;
      this.editData2 = { ...row }; // Clone the row data to avoid mutating directly
      console.log(this.editData2);
  
    }
  
  
  
  
    closeEditForm(): void {
      this.isEditFormVisible = false;
      this.editData = {};
    }
    closeEditForm1(): void {
      this.isEditFormVisible1 = false;
      this.editData1 = {};
    }
    closeEditForm2(): void {
      this.isEditFormVisible2 = false;
      this.editData2 = {};
    }
  
    updateData(): void {
      this.loading = true;
  
      this.familytreeService.updateFamilyName(this.editData.Id, this.editData).subscribe(
        (response) => {
          console.log('Update successful:', response);
          alert('Update successful:');
          this.loading = false;
  
          const index = this.lookups.findIndex((lookup) => lookup.Id === this.editData.Id);
          if (index !== -1) {
            this.lookups[index] = { ...this.editData }; // Update the local list with new data
          }
          this.closeEditForm();
        },
        (error) => {
          console.error('Error updating family name:', error);
          alert('Error updating family family name:');
          this.loading = false;
        }
      );
    }
    updateData1(): void {
      this.loading = true;
  
      this.familytreeService.UpdateMembers(this.editData1.Id, this.editData1).subscribe(
        (response) => {
          console.log(this.editData1);
  
          console.log('Update successful:', response);
          alert('Update successful:');
          this.loading = false;
  
          const index = this.lookups.findIndex((member) => member.Id === this.editData1.Id);
          if (index !== -1) {
            this.lookups[index] = { ...this.editData1 }; // Update the local list with new data
          }
          this.closeEditForm1();
        },
        (error) => {
          console.error('Error updating members:', error);
          alert('Error updating family members:');
          this.loading = false;
        }
      );
    }
  
  
    // Function to update data (already provided)
    updateData2(): void {
      // Set loading state to true when the update operation begins
      this.loading = true;
  
      // Call the UpdateMemberRelations method of the service
      this.familytreeService.UpdateMemberRelations(this.editData2.Id, this.editData2).subscribe(
        (response) => {
          // Successfully updated
          console.log('Update successful:', response);
          alert('Update successful: ' + response);
  
          // Set loading state to false after completion
          this.loading = false;
  
          // Find the index of the member to update in the local list
          const index = this.lookups.findIndex((member) => member.Id === this.editData2.Id);
  
          // If the member is found in the local list, update it
          if (index !== -1) {
            this.lookups[index] = { ...this.editData2 }; // Update the local list with new data
          }
  
          // Close the edit form after updating
          this.closeEditForm2();
        },
        (error) => {
          // Error occurred during the update operation
          console.error('Error updating relation:', error);
          alert('Error updating family relation: ' + error.message);
  
          // Set loading state to false in case of error
          this.loading = false;
        }
      );
    }
  
  }

// }
