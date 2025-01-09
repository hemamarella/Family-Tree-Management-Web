// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class DashboardService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardStats } from './modal/dashboard';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getFamilyStats(): Observable<DashboardStats> {
    return of({
      totalFamilies: 150,
      totalMembers: 450,
      familyMembers: [
        { familyName: 'Family A', members: 3 },
        { familyName: 'Family B', members: 4 },
        { familyName: 'Family C', members: 5 },
        { familyName: 'Family D', members: 2 },
        { familyName: 'Family E', members: 6 },
        { familyName: 'Family F', members: 3 },
        { familyName: 'Family G', members: 4 },
        { familyName: 'Family H', members: 5 },
        { familyName: 'Family I', members: 2 },
        { familyName: 'Family J', members: 6 },
        { familyName: 'Family K', members: 2 },
        { familyName: 'Family L', members: 6 }
      ],
      monthlyStats: [
        { month: 'Jan', members: 30 },
        { month: 'Feb', members: 45 },
        { month: 'Mar', members: 25 },
        { month: 'Apr', members: 50 },
        { month: 'May', members: 35 },
        { month: 'Jun', members: 40 },
        { month: 'Jul', members: 50 },
        { month: 'Aug', members: 35 },
        { month: 'Sep', members: 40 },
        { month: 'Oct', members: 50 },
        { month: 'Nov', members: 35 },
        { month: 'Dec', members: 40 }
      ],
      yearlyStats: [
        { year: '2020', members: 150 },
        { year: '2021', members: 200 },
        { year: '2022', members: 250 },
        { year: '2023', members: 450 }
      ]
    });
  }
}