import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/login/services/auth-guard.service';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  currentPost: Post = history.state;
  errorMsg = '';
  constructor(private postService: PostService, private router: Router, private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
  }

  EditPost()
  {
    const userToken = this.authGuardService.GetCurrentUserToken();
    const editedPost = {title: this.currentPost.title, content: this.currentPost.content, headerImage: this.currentPost.headerImage}
    this.postService.EditPost(userToken, this.currentPost.postId, editedPost).subscribe((returnedPostInfo) => {
      console.log(returnedPostInfo);
      this.errorMsg = '';
      this.router.navigate(['/posts']);
    }, (error) => {
      console.log(error);
      this.errorMsg = error.error.message; 
    });
  }

}
