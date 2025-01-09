// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-relationsview',
//   templateUrl: './relationsview.component.html',
//   styleUrls: ['./relationsview.component.css']
// })
// export class RelationsviewComponent {

// }


import { Component, OnInit } from '@angular/core';
import { GridviewService } from '../gridview.service';

@Component({
  selector: 'app-relationsview',
  templateUrl: './relationsview.component.html',
  styleUrls: ['./relationsview.component.css']
})
export class RelationsviewComponent implements OnInit {
  // isEditFormVisible2: boolean = false;
  loading = false;
  // editData2: any = {};

  selectedRelation: string = ''; // Selected relation ID
  relations: any[]= []; // Relations array
  
  // Data structure for relations
  lookups = [
    {
      Id: 1,
      Members: [
        {
          Id: 1,
          FirstName: '',
          LastName: '',
          Relationships: [
            {
              Id: 1,
              ParentMemberId: 1,
              ChildMemberId: 2,
              RelationId: 1,
              RelationName: ''
            },
          ],
        },
      ],
    },
  ];


  constructor(private familytreeService: GridviewService) {}

  ngOnInit(): void {
    this.loadFamilyNames();
  }

  loadFamilyNames(): void {
    this.familytreeService.getFamilyNames1().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.lookups = data;
      },
      (error: any) => {
        console.error('Error fetching family names:', error);
      }
    );
    this.familytreeService.  getRelation().subscribe(
      (data: any) => {
        console.log('API Response:', data);
        this.relations = data;
      },
      (error: any) => {
        console.error('Error fetching family names:', error);
      }
    );
  }


  deleteRelation(id: number): void {
    if (id == null || id === undefined) {
      console.error('Invalid id:', id);
      return;
    }

    console.log('Attempting to delete with ID:', id);
    this.familytreeService.deleteRelation(id).subscribe({
      next: (response) => {
        console.log('Deleted successfully:', response);
      },
      error: (error) => {
        console.error('Error deleting relation:', error);
      }
    });
  }

  // openEditForm2(row: any): void {
  //   console.log(row);
  //   this.isEditFormVisible2 = true;
  //   this.editData2 = { ...row };
  //   console.log(this.editData2);
  // }

  // closeEditForm2(): void {
  //   this.isEditFormVisible2 = false;
  //   this.editData2 = {};
  // }

  updateData2(): void {
    this.loading = true;

    this.familytreeService.UpdateMemberRelations(this.editData2.Id, this.editData2).subscribe(
      (response) => {
        console.log('Update successful:', response);
        alert('Update successful: ' + response);
        this.loading = false;

        const index = this.lookups.findIndex((member) => member.Id === this.editData2.Id);
        if (index !== -1) {
          this.lookups[index] = { ...this.editData2 };
        }
        this.closeEditForm2();
      },
      (error) => {
        console.error('Error updating relation:', error);
        alert('Error updating family relation: ' + error.message);
        this.loading = false;
      }
    );
  }


  // onSubmit() {
  //   console.log('Form submitted:', this.editData2);
  //   // Handle the form data, e.g., save or update it
  //   this.closeEditForm2();
  // }


isEditFormVisible2 = false; // Flag to show/hide the edit form
editData2:any = {
  ParentMember: '',
  ChildMember: '',
  RelationName: ''
}; // Data object for the form

openEditForm2(relation: any) {
  const selectedRelation = this.relations.find(r => r.Id === relation.RelationId);

  // Patch the relation with the correct RelationName
  this.editData2 = {
    ...relation,
    RelationId: relation.RelationId, // Ensure RelationId is set
    RelationName: selectedRelation ? selectedRelation.Name : '', // Derive RelationName
  };

  this.isEditFormVisible2 = true; // Show the edit form
  console.log('Patched editData2:', this.editData2); // Debug log
}

updateRelationNameFromDropdown() {
  const selectedRelation = this.relations.find(r => r.Id === this.editData2.RelationId);
  this.editData2.RelationName = selectedRelation ? selectedRelation.Name : '';
  console.log('Updated RelationName:', this.editData2.RelationName); // Debug log
}




// Method to handle form submission
onSubmit() {
  console.log('Form submitted:', this.editData2);
  // Save or update the relation data
  this.closeEditForm2();
}

// Method to close the edit form
closeEditForm2() {
  this.isEditFormVisible2 = false; // Hide the edit form
  this.editData2 = { ParentMember: '', ChildMember: '', RelationName: '' }; // Reset the form data
}



}
