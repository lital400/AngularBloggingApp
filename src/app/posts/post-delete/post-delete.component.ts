import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthGuardService } from 'src/app/login/services/auth-guard.service';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {

  @Input('currentPost') currentPost: Post;
  @Output() cancelDeleteEvent = new EventEmitter<boolean>();

  mySubscription: any;
  errorMsg = '';

  constructor(private postService: PostService, private router: Router, private authGuardService: AuthGuardService) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.mySubscription = this.router.events.subscribe((event) => { 
      if (event instanceof NavigationEnd) { 
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
   }

  DeletePost() 
  {
    const userToken = this.authGuardService.GetCurrentUserToken();
    this.postService.DeletePost(userToken, this.currentPost.postId).subscribe((returnedPostInfo) => {
      console.log(returnedPostInfo);
      this.errorMsg = '';
      
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/posts']);   // refresh post list component to reflect changes
      }); 

    }, (error) => {
      console.log(error);
      this.errorMsg = error.error.message;  
    });
  }
  
  cancelDelete()
  {
    this.cancelDeleteEvent.emit(false);
  }

}
