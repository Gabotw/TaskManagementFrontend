import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './iam/services/authentication.interceptor';
import { SignInComponent } from './iam/pages/sign-in/sign-in.component';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {PageNotFoundComponent} from './public/components/page-not-found/page-not-found.component';
import { ToolbarComponent } from './public/components/toolbar/toolbar.component';
import { HomeEmployeeComponent } from './public/pages/home-employee/home-employee.component';
import { HomeAdminComponent } from './public/pages/home-admin/home-admin.component';
import { TaskCreateComponent } from './management/component/task-create/task-create.component';
import { TaskListAdminComponent } from './management/component/task-list/task-list-admin.component';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {MatIcon} from '@angular/material/icon';
import {MatSort} from '@angular/material/sort';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatTooltip} from '@angular/material/tooltip';
import { TaskEditComponent } from './management/component/task-edit/task-edit.component';
import {MatSelect} from '@angular/material/select';
import { TaskListEmployeeComponent } from './management/component/task-list-employee/task-list-employee.component';
import { LoaderComponent } from './public/components/loader/loader.component';
import { ConfirmDialogComponent } from './public/components/confirm-dialog/confirm-dialog.component';
import {CustomNotificationComponent} from './public/components/custom-notification/custom-notification.component';
@NgModule({
  declarations: [
    App,
    HomeEmployeeComponent, TaskListAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SignInComponent,
    MatSidenavContent,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatListItem,
    PageNotFoundComponent,
    ToolbarComponent,
    MatLabel,
    MatFormField,
    MatPaginator,
    MatIcon,
    MatLabel,
    MatInput,
    MatLabel,
    MatFormField,
    MatPaginator,
    MatRow,
    MatHeaderRow,
    MatPaginator,
    MatIcon,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatTable,
    MatIcon,
    MatPaginator,
    MatSort,
    MatIcon,
    MatRowDef,
    MatHeaderRowDef,
    MatNoDataRow,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatCardHeader,
    MatButton,
    MatTooltip,
    HomeAdminComponent,
    TaskCreateComponent,
    TaskEditComponent,
    MatOption,
    MatSelect,
    MatCardSubtitle,
    MatCardActions,
    TaskListEmployeeComponent,
    ConfirmDialogComponent,
    LoaderComponent,
    CustomNotificationComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideNativeDateAdapter(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
