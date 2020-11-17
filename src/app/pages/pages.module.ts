import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';

import { ImagesComponent } from './components/images/images.component';
import { LoadComponent } from './components/load/load.component';
import { NgDropFilesDirective } from '../directives/ng-drop-files.directive';

@NgModule({
  declarations: [ImagesComponent, LoadComponent, NgDropFilesDirective],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
