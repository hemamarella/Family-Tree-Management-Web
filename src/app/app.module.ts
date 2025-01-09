import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LayoutComponent } from './layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NgClass } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MembersChartComponent } from './members-chart/members-chart.component';
import { StatBoxComponent } from './stat-box/stat-box.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GridviewComponent } from './gridview/gridview.component';
import { MemberformComponent } from './memberform/memberform.component';
import { FamilyComponent } from './family/family.component';
import { RelationsComponent } from './relations/relations.component';
import { RelationsviewComponent } from './relationsview/relationsview.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    WelcomeComponent,
    LayoutComponent,
    NavbarComponent,
    UserProfileComponent,
    ProfileComponent,
    ChangePasswordComponent,
    MainLayoutComponent,
    DashboardComponent,
    MembersChartComponent,
    StatBoxComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    GridviewComponent,
    MemberformComponent,
    FamilyComponent,
    RelationsComponent,
    RelationsviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    NgClass,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
