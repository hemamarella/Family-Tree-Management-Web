import { Component } from '@angular/core';
import { GridviewService } from '../gridview.service';


@Component({
  selector: 'app-gridview',
  templateUrl: './gridview.component.html',
  styleUrls: ['./gridview.component.css']
})
export class GridviewComponent {
  expandedRow: number | null = null; // Tracks parent table expanded row
  expandedSubRow: number | null = null; // Tracks child table expanded row
  isEditFormVisible: boolean = false;
  isEditFormVisible1: boolean = false;
  isEditFormVisible2: boolean = false;
  loading=false;

  // Sample data structure
    lookups = [
    {
      Id: 1, // Changed to number
      Surname: '',
      Color: '',
      Description: '',
      CreatedAt: '',
      Members: [
        {
          Id: 1,
          Image:'', // Changed to number
          FirstName: '',
          LastName: '',
          Gender: '',
          DateOfBirth: '',
          CreatedAt: '',
          Relationships: [
            {
              Id: 1, // Changed to number
              ParentMemberId: 1, // Changed to number
              ChildMemberId: 2, // Changed to number
              RelationId: 1, // Changed to number
              RelationName :''
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


  toggleExpand(index: number): void {
    this.expandedRow = this.expandedRow === index ? null : index;
    // this.expandedSubRow = null; // Reset sub-row expansion
  }

  toggleSubExpand(index: number): void {
    this.expandedSubRow = this.expandedSubRow === index ? null : index;
  }
  deleteParent(parentId: number): void {
    this.gridviewService.deleteFamily(parentId).subscribe({
      next: (response) => {
        console.log('Family deleted successfully:', response);
        // Remove the deleted item from the local array
        this.lookups = this.lookups.filter((lookup) => lookup.Id !== parentId);
      },
      error: (error) => {
        console.error('Error deleting family:', error);
      },
      complete: () => {
        console.log('Delete operation completed.');
      }
    });
  }
  deleteRelation(id: number): void {
    if (id == null || id === undefined) {
      console.error('Invalid id:', id);  // Ensure id is valid before proceeding
      return;
    }

  
    console.log('Attempting to delete with ID:', id);  // Check the ID value
    this.gridviewService.deleteRelation(id).subscribe({
      next: (response) => {
        console.log('Deleted successfully:',response);
      },
      error: (error) => {
        console.error('Error deleting family:', error);
      }
    });
  }
  
  deleteChild(parentIndex: number, childId: number): void {
    const parent = this.lookups[parentIndex];
    parent.Members = parent.Members.filter((member) => member.Id !== childId);
  }
  
  deleteSubChild(parentIndex: number, childIndex: number, subChildId: number): void {
    const child = this.lookups[parentIndex].Members[childIndex];
    child.Relationships = child.Relationships.filter((relation) => relation.ChildMemberId !== subChildId);
  }
  
  constructor(
    private gridviewService:GridviewService
  ) { }
  ngOnInit(): void {
    this.loadFamilyNames();
}

  loadFamilyNames(): void {
    this.gridviewService.getFamilyNames1().subscribe(
      (data: any) => {
        console.log('API Response:', data); 
        this.lookups = data; // Bind data to lookups
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
    this.updateData1(); // Call the method to save changes
    this.closeEditForm1(); // Close the modal after submission
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

    this.gridviewService.updateFamilyName(this.editData.Id, this.editData).subscribe(
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
        this.loading=false;
      }
    );
  }
  updateData1(): void {
    this.loading = true;

    this.gridviewService.UpdateMembers(this.editData1.Id, this.editData1).subscribe(
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
        this.loading=false;
      }
    );
  }


// Function to update data (already provided)
updateData2(): void {
  // Set loading state to true when the update operation begins
  this.loading = true;

  // Call the UpdateMemberRelations method of the service
  this.gridviewService.UpdateMemberRelations(this.editData2.Id, this.editData2).subscribe(
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
