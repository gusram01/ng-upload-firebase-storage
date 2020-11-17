export class FileItem {
  myFile: File;
  name: string;
  url: string;
  loading: boolean;
  progress: number;

  constructor(file: File) {
    this.myFile = file;
    this.name = file.name;
    this.loading = false;
    this.progress = 0;
  }
}
