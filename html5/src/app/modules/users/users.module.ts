import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';

import { DemoMaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    UsersComponent,
    LoginComponent,
  ]
})
export class UsersModule { }
