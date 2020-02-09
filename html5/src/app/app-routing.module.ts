import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page-structure/home/home.component';
import { UsersModule } from './modules/users/users.module';


const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => UsersModule
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
