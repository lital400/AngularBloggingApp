import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postList: Post[] = [];
  listHasPosts: boolean;
  errorMsg = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.GetAllPosts().subscribe((returnedPosts) => {
      this.postList = returnedPosts;
      console.log(this.postList);
      this.errorMsg = '';
      
      if(this.postList.length == 0)
        this.listHasPosts = false;
      else
        this.listHasPosts = true;
        
    }, (error) => {
      console.log(error);
      this.errorMsg = error.error.message;   
    });
  }

}
