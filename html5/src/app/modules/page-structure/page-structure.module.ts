import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { DemoMaterialModule } from '../../material.module';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { MsgErrorComponent } from './msg-error/msg-error.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    RouterModule
  ],
  declarations: [
    Error404Component,
    HomeComponent,
    MenuComponent,
    MsgErrorComponent,
  ],
  exports: [
    MenuComponent,
    MsgErrorComponent,
  ]
})
export class PageStructureModule { }
