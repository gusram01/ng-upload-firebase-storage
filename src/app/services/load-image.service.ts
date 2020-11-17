import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { FileItem } from '../models/file';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Item {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoadImageService {
  private COLLECTION_IMGS = 'images';

  constructor(
    public db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  private saveImg(img: { name: string; url: string }): void {
    this.db.collection(`/${this.COLLECTION_IMGS}`).add(img);
  }

  getImages(): Observable<Item[]> {
    return this.db.collection<Item>(`/${this.COLLECTION_IMGS}`).valueChanges();
  }

  saveToFirestore(image: FileItem): Observable<UploadTaskSnapshot> {
    const filePath = `/${this.COLLECTION_IMGS}/${image.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, image.myFile);

    return task.snapshotChanges().pipe(
      finalize(() =>
        fileRef.getDownloadURL().subscribe((data) => {
          image.url = data;
          this.saveImg({ name: image.name, url: image.url });
        })
      )
    );
  }
}
