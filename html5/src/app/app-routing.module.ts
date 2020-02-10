import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page-structure/home/home.component';
// import { LoginComponent } from './modules/users/login/login.component';
// import { RegisterComponent } from './modules/users/register/register.component';
import { UsersModule } from './modules/users/users.module';


const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => UsersModule
  },

  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  // { path: 'users/login', component: LoginComponent },
  // { path: 'users/register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
