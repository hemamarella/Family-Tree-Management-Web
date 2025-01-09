// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class GridviewService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FamilyName {
  Id: number; // Changed to number
  Surname: string;
  Color: string;
  Description: string;
  CreatedAt: Date;
  members: Member[];
}

export interface Member {
  Id: number; // Changed to number
  FirstName: string;
  LastName: string;
  Gender: string;
  DateOfBirth: Date;
  relationships: Relationship[];
}

export interface Relationship {
  Id: number; // Changed to number
  ParentMemberId: number; // Changed to number
  ChildMemberId: number; // Changed to number
  RelationId: number; // Changed to number
}


@Injectable({
  providedIn: 'root',
})
export class GridviewService {

  private apiUrl2='https://localhost:44312/api/FamilyTree/GetFamilyTreeData1';
  private apiUrl3='https://localhost:44312/api/FamilyTree/DeleteFamily';
  private apiUrl4='https://localhost:44312/api/FamilyTree/DeleteRelationship';
  private apiUrl5=' https://localhost:44312/api/FamilyTree/api/FamilyNames';
  private apiUrl6='https://localhost:44312/api/FamilyTree/api/Members'
  private apiUrl7='https://localhost:44312/api/FamilyTree/api/MemberRelations'



  constructor(private http: HttpClient) {}

  getFamilyNames1(): Observable<any> {
    return this.http.get(this.apiUrl2);
  }

  updateFamilyName(id: number, familyName: any): Observable<any> {
    return this.http.put(`${this.apiUrl5}/${id}`, familyName);
  }
  UpdateMembers(id: number, member: any): Observable<any> {
    return this.http.put(`${this.apiUrl6}/${id}`, member);
  }
  UpdateMemberRelations(id: number, membersRelation: any): Observable<any> {
    return this.http.put(`${this.apiUrl7}/${id}`, membersRelation);
  }

deleteFamily(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl3}/${id}`);
}
deleteRelation(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl4}/${id}`);
}



}
