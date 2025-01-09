// export interface Dashboard {
// }
export interface FamilyMember {
    familyName: string;
    members: number;
  }
  
  export interface MonthlyStat {
    month: string;
    members: number;
  }
  
  export interface YearlyStat {
    year: string;
    members: number;
  }
  
  export interface DashboardStats {
    totalFamilies: number;
    totalMembers: number;
    familyMembers: FamilyMember[];
    monthlyStats: MonthlyStat[];
    yearlyStats: YearlyStat[];
  }