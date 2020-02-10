import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page-structure/home/home.component';
import { GalleryComponent } from './page-structure/gallery/gallery.component';
import { SignupComponent } from './page-structure/signup/signup.component';
import { UsersModule } from './modules/users/users.module';


const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => UsersModule
  },

  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'login', component: HomeComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
