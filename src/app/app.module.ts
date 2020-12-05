import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './users/services/user.service';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuardService } from './login/services/auth-guard.service';
import { PostService } from './posts/services/post.service';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostListItemComponent } from './posts/post-list-item/post-list-item.component';
import { PostDeleteComponent } from './posts/post-delete/post-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    NewUserComponent,
    UsersComponent,
    LoginComponent,
    NewPostComponent,
    PostsComponent,
    PostListComponent,
    PostEditComponent,
    PostListItemComponent,
    PostDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AuthGuardService, 
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
