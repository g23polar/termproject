import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {AdminComponent} from './admin/admin.component';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {CreateComponent} from './create/create.component';
import {ReviewComponent} from './review/review.component';
import {MyReviewsComponent} from './my-reviews/my-reviews.component';
import {ReviewlistComponent} from './reviewlist/reviewlist.component';

// TODOc: add the route to the 'settings' component.

const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]}, {path: 'login', component: LoginComponent}, { path: 'register', component: RegisterComponent },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}},
  {path: 'create', component: CreateComponent},
  {path: 'review', component: ReviewComponent},
  {path: 'viewReviews', component: ReviewlistComponent},
  {path: 'myReviews', component: MyReviewsComponent},
  {path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
