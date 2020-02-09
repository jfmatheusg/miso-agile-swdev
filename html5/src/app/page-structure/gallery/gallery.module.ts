import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GalleryRoutingModule } from './gallery.routing.module';
import { GalleryComponent } from './gallery.component';

import { DemoMaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GalleryComponent
  ]
})
export class GalleryModule { }
