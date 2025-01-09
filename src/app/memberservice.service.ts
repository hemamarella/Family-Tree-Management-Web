// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class MemberserviceService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MemberserviceService {
  private apiUrl = 'https://localhost:44310/GetFamilies'; // Replace with your API URL
  private apiUrl1='https://localhost:44310/AddFamilyMembers1';
  private apiUrl2='https://localhost:44310/GetMembers?familyId={familyId}';
  private apiUrl3='https://localhost:44310/GetRelations';
  private apiUrl4='https://localhost:44310/AddMemberRelations';
  private apiUrl6='https://localhost:44310/Addfamily';

  constructor(private http: HttpClient) {}

  

  getFamilyNames():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl); 
  }
  AddFamilyMembers1(data:FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl1, data);
  }
 
  getMemberNames(familyId: string,type:string): Observable<any> {
    const url = `https://localhost:44310/GetMembers?familyId=${familyId}&type=${type}`; // Ensure familyId is correctly passed in URL
    return this.http.get<any[]>(url);
  }
  
  AddMemberRelations(data:FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl4, data);
  }
  
  getRelations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl3);
  }



  checkSurnameExists(surname: string): Promise<boolean> {
    return this.http
      .post<boolean>('https://localhost:44310/CheckSurnameExists', { surname })
      .toPromise()
      .then((response: boolean | undefined) => !!response)  // Convert response to boolean (false if undefined or null)
      .catch(() => false);  // In case of error, return false
  }
  postFamilyMemberDetails1(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl6, formData);
  }
 
}

