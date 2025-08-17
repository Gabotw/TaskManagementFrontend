import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpAdminComponent} from './iam/pages/sign-up-admin/sign-up-admin.component';
import {ChooseRoleComponent} from './iam/pages/choose-role/choose-role.component';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {PageNotFoundComponent} from './public/components/page-not-found/page-not-found.component';
import {HomeEmployeeComponent} from './public/pages/home-employee/home-employee.component';
import {HomeAdminComponent} from './public/pages/home-admin/home-admin.component';
import {TaskListAdminComponent} from './management/component/task-list/task-list-admin.component';
import {TaskListEmployeeComponent} from './management/component/task-list-employee/task-list-employee.component';
import {SignUpEmployeeComponent} from './iam/pages/sign-up-employee/sign-up-employee.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent},
  { path: 'choose-role', component: ChooseRoleComponent },
  { path: 'sign-up-admin', component: SignUpAdminComponent },
  { path: 'sign-up-employee', component: SignUpEmployeeComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'home-employee', component: HomeEmployeeComponent },
  { path: 'home-admin', component: HomeAdminComponent },
  { path: 'task-list-admin', component: TaskListAdminComponent },
  { path: 'task-list-employee', component: TaskListEmployeeComponent },


  { path: '', redirectTo: 'sign-in', pathMatch: 'full'},
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
