import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AthletesComponent } from './athletes.component';
import { RetrieveComponent } from './retrieve/retrieve.component';

const routes: Routes = [
  {
    path: '',
    component: AthletesComponent,
    children: [
      {
        path: ':pk',
        component: RetrieveComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AthletesRoutingModule { }
