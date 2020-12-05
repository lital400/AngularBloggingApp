import { Component, Input, OnInit, Output } from '@angular/core';
import { Post } from '../models/post.model';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  @Input('currentPost') currentPost: Post;
  
  currentUserPost: boolean = false;
  deleteConfirm: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const thisUser = this.GetCurrentUser();
    if(thisUser != null && this.currentPost.userId == thisUser)  // check if post belongs to current user
      this.currentUserPost = true;
    else 
      this.currentUserPost = false;
  }

  confirmDelete()
  {
    this.deleteConfirm = true;
  }

  onCancelDeleteEvent(event)
  {
    this.deleteConfirm = event;
  }

  GetCurrentUser()
  {
    if ("token" in localStorage) 
    {
      let userToken = localStorage.getItem('token');
      let tokenObj = JSON.parse(userToken);
      if(tokenObj != null)
      {
        var tokenInfo: any = jwt_decode(tokenObj.token);
        return tokenInfo.UserData.userId; 
      }
      else
        return null;
    }
    return null;
  }
}
