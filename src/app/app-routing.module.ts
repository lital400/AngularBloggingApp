import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './login/services/auth-guard.service';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { PostDeleteComponent } from './posts/post-delete/post-delete.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NewUserComponent } from './users/new-user/new-user.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path:'posts',
    component: PostListComponent,
  },
  {
    path:'new-user',
    component: NewUserComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'new-post',
    component: NewPostComponent,
    canActivate: [AuthGuardService]
  }, 
  {
    path:'edit-post',
    component: PostEditComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'delete-post',
    component: PostDeleteComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
