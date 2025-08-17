import { Component, OnInit } from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LoaderService} from '../../services/loader.service';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-overlay" *ngIf="loading">
      <div class="loader-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p class="loading-text">Cargando...</p>
      </div>
    </div>
  `,
  imports: [
    MatProgressSpinner,
    NgIf
  ],
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
      border-radius: 10px;
      background: white;
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
    }

    .loading-text {
      margin-top: 15px;
      color: #4568dc;
      font-weight: 600;
      font-size: 16px;
    }
  `]
})
export class LoaderComponent implements OnInit {
  loading = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.loading$.subscribe(loading => {
      this.loading = loading;
    });
  }
}
