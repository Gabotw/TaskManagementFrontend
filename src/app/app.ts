import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  title = 'Gestor de Tareas';
  options = [
    { path: '/home', title: 'Home'},
  ]
  constructor(private router: Router)
  {
  }
  shouldShowToolbar(){
    return !(this.router.url == '/sign-up' || this.router.url == '/sign-in'
      || this.router.url == '/sign-up-admin' || this.router.url == '/sign-up-employee'
      || this.router.url == '/choose-role' || this.router.url == '/page-not-found');
  }
  shouldShowFooter(){
    return this.router.url !== '/sign-up' && this.router.url !== '/sign-in';
  }
}
