import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/page-structure/home/home.component';
import { LoginComponent } from './modules/users/login/login.component';
import { RegisterComponent } from './modules/users/register/register.component';
import { Error404Component } from './modules/page-structure/error404/error404.component';
import { RetrieveComponent } from './modules/athletes/retrieve/retrieve.component';
import { VideoComponent } from './modules/athletes/video/video.component';


const routes: Routes = [
  // {
  //   path: 'users',
  //   loadChildren: './modules/users/users.module#UsersModule'
  // },
  { path: '', component: HomeComponent },
  { path: 'users/login', component: LoginComponent },
  { path: 'users/register', component: RegisterComponent },
  { path: 'athletes/:pk', component: RetrieveComponent },
  { path: 'athletes/video/:pk', component: VideoComponent },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
