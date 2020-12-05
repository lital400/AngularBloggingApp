import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/login/services/auth-guard.service';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPost: Post;
  errorMsg = '';

  constructor(private postService: PostService, private router: Router, private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
    this.newPost = new Post;
  }

  CreateNewPost()
  {
    const userToken = this.authGuardService.GetCurrentUserToken();
    this.postService.CreateNewPost(userToken, this.newPost).subscribe((returnedPostInfo) => {
      console.log(returnedPostInfo);
      this.errorMsg = '';
      this.router.navigate(['/posts']);
    }, (error) => {
      console.log(error);
      this.errorMsg = error.error.message; 
    });
  }

}
