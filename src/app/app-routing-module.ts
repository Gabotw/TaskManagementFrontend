import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpEmployeeComponent} from './iam/pages/sign-up-employee/sign-up-employee.component';
import {SignUpAdminComponent} from './iam/pages/sign-up-admin/sign-up-admin.component';
import {SuccessfulSignUpComponent} from './iam/pages/successful-sign-up/successful-sign-up.component';
import {ChooseRoleComponent} from './iam/pages/choose-role/choose-role.component';
import {ForgotPasswordComponent} from './iam/pages/forgot-password/forgot-password.component';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {PageNotFoundComponent} from './public/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'choose-role', component: ChooseRoleComponent },
  { path: 'successful', component: SuccessfulSignUpComponent },
  { path: 'sign-up-admin', component: SignUpAdminComponent },
  { path: 'sign-up-employee', component: SignUpEmployeeComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },

  { path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
