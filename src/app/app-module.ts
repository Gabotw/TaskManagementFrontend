import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './iam/services/authentication.interceptor';
import { SignInComponent } from './iam/pages/sign-in/sign-in.component';
import { HomeComponent } from './public/pages/home/home.component';
import { PageNotFoundComponent } from './public/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    App,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SignInComponent
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
