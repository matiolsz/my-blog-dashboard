import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard]},

  { path: 'posts', component: AllPostsComponent, canActivate: [authGuard]},
  { path: 'new-post', component: NewPostComponent, canActivate: [authGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
