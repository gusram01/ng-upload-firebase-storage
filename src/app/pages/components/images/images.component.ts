import { Component, OnInit } from '@angular/core';
import { LoadImageService } from '../../../services/load-image.service';

export interface Item {
  name: string;
  url: string;
}

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styles: [],
})
export class ImagesComponent implements OnInit {
  items: Item[];

  constructor(public dbService: LoadImageService) {}

  ngOnInit(): void {
    this.dbService.getImages().subscribe((data) => (this.items = data));
  }
}
