import { FileItem } from '../models/file';
import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]',
})
export class NgDropFilesDirective {
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();
  @Input() receivedFiles: FileItem[] = [];

  constructor() {}

  @HostListener('dragover', ['$event'])
  onDragEnter(event): void {
    this.mouseOver.emit(true);
    this.preventDrop(event);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event): void {
    this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  onDrop(event): void {
    const dataTransfer = this.getTransfer(event) as DataTransfer;
    if (!dataTransfer) {
      return;
    }
    this.extract(dataTransfer.files);
    this.preventDrop(event);
    this.mouseOver.emit(false);
  }

  private getTransfer(event: DragEvent): any {
    return event.dataTransfer
      ? event.dataTransfer
      : // @ts-expect-error
        event.originalEvent.dataTransfer;
  }

  private extract(fileList: FileList): void {
    Object.keys(fileList).forEach((key) => {
      if (this.canLoaded(fileList[key])) {
        this.receivedFiles.push(new FileItem(fileList[key]));
      }
    });
  }

  private canLoaded(file: File): boolean {
    return !this.repeatedFile(file.name) && this.isImage(file.type);
  }

  private preventDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private repeatedFile(filename: string): boolean {
    return !this.receivedFiles.every((item) => item.name !== filename);
  }

  private isImage(fileType: string): boolean {
    return fileType.includes('image');
  }
}
