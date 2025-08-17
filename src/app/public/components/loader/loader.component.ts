import { Component, OnInit } from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {LoaderService} from '../../services/loader.service';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  imports: [
    MatProgressSpinner,
    NgIf
  ],
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
