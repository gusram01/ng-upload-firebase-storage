import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../../models/file';
import { LoadImageService } from '../../../services/load-image.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: [],
})
export class LoadComponent implements OnInit {
  files: FileItem[] = [];
  overElement = false;

  constructor(public imgService: LoadImageService) {}

  ngOnInit(): void {}

  saveImages(): void {
    this.files.map((file, index) => {
      this.imgService.saveToFirestore(file).subscribe((data) => {
        data.task.on(
          'state_changed',
          (snapshot) =>
            (file.progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100),
          (err) => {},
          () => {
            file.loading = false;
            this.files[index] = file;
          }
        );
      });
    });
  }
  clear(): void {
    this.files = [];
  }
}
