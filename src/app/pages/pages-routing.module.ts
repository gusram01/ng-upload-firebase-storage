import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesComponent } from './components/images/images.component';
import { LoadComponent } from './components/load/load.component';

const pagesRoutes: Routes = [
  { path: 'images', component: ImagesComponent },
  { path: 'load', component: LoadComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'images' },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
