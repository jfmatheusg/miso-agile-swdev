import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AthletesRoutingModule } from './athletes-routing.module';
import { AthletesComponent } from './athletes.component';
import { RetrieveComponent } from './retrieve/retrieve.component';

import { DemoMaterialModule } from '../../material.module';
import { PageStructureModule } from '../page-structure/page-structure.module';

@NgModule({
  imports: [
    CommonModule,
    AthletesRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PageStructureModule,
  ],
  declarations: [
    AthletesComponent,
    RetrieveComponent,
  ]
})
export class AthletesModule { }
