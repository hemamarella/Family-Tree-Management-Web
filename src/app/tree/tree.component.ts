import { Component, OnInit } from '@angular/core';
import { MemberserviceService } from '../memberservice.service';

interface Member {
  id: number;
  FirstName: string;
  gender: string;
  dateOfBirth: Date;  
  Photo: string;
  Relation: string;
  children?: Member[]; // Optional, for recursive children
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  familyTree: Member[] = [];  // Array to hold the family tree data
  selectedFamilyNameId: number = 1; // Default selected family name ID
  familyNames: any[] = []; // Array to hold available family names

  constructor(private familyTreeService: MemberserviceService) {} // Inject the service

  ngOnInit(): void {
    this.loadFamilyNames();
    this.fetchFamilyTree();
  }

  loadFamilyNames(): void {
    // Call the service to load available family names (replace with actual API call)
    this.familyTreeService.getFamilyNames().subscribe(
      (data: any[]) => {
        this.familyNames = data;  // Store family names for the dropdown
      },
      (error) => {
        console.error('Error fetching family names', error);
      }
    );
  }

  fetchFamilyTree(): void {
    this.familyTreeService.getFamilyTree(this.selectedFamilyNameId).subscribe(
      (data: any) => {
        try {
          if (data && data.length > 0) {
            const abc = JSON.parse(data[0])
            console.log(abc);
            
            // Parse the first item in the array, which is a stringified JSON array
            const parsedData = abc; 
            this.familyTree = this.groupMembersIntoTree(parsedData); // Transform into tree structure
           // this.familyTree = abc;
            console.log(this.familyTree); // Verify the hierarchical structure
          } else {
            console.log('No family tree data available');
          }
        } catch (error) {
          console.error('Error parsing family tree data', error);
        }
      },
      (error) => {
        console.error('Error fetching family tree data', error);
      }
    );
  }
  

  
  groupMembersIntoTree(data: any[]): any[] {
    console.log('Raw Data:', data); // Debugging raw input
  
    const membersMap = new Map<number, any>();
  
    // Initialize the map with each member and a `children` property
    data.forEach(member => {
      membersMap.set(member.id, { ...member, children: [] });
    });
  
    console.log('Members Map:', membersMap); // Debugging the map
  
    const tree: any[] = [];
  
    // Build the hierarchical tree
    data.forEach(member => {
      if (!member.ParentMemberId) {
        // Root members (level 0, no parent)
        tree.push(membersMap.get(member.id));
      } else {
        // Add this member to the children of its parent
        const parent = membersMap.get(member.ParentMemberId);
        if (parent) {
          parent.children.push(membersMap.get(member.id));
        } else {
          console.warn('Parent not found for member:', member);
        }
      }
    });
  
    console.log('Hierarchical Tree:', tree); // Debugging the result
    return tree;
  }
  
  

  onFamilyNameChange(event: Event): void {
    // Use type assertion to tell TypeScript that the target is an HTMLSelectElement
    const selectElement = event.target as HTMLSelectElement;  // Casting the target to HTMLSelectElement
    const selectedId = Number(selectElement.value);  // Get the value from the select element and convert it to a number

    this.selectedFamilyNameId = selectedId;  // Update the selected family name ID
    this.fetchFamilyTree();  // Fetch the new family tree
  }
}
