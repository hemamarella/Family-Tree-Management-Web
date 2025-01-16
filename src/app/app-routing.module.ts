import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GridviewComponent } from './gridview/gridview.component';
import { MemberformComponent } from './memberform/memberform.component';
import { FamilyComponent } from './family/family.component';
import { RelationsComponent } from './relations/relations.component';
import { RelationsviewComponent } from './relationsview/relationsview.component';
import { TreeComponent } from './tree/tree.component';


const routes: Routes = [
  {
  path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent }
    ]
  },
  {
    path: 'mainlayout',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'familyform', component: FamilyComponent },
      { path: 'memberform', component: MemberformComponent },
      { path: 'relationsform', component: RelationsComponent },
      { path: 'gridview', component: GridviewComponent },
      { path: 'relationsview', component: RelationsviewComponent },
      { path: 'Treeview', component: TreeComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
