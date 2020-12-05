import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  BASE_URL='http://localhost:3000';     // works with my Node.js Express back end API 

  constructor(private http: HttpClient) { }

  CreateNewPost(token: string, newPost: Post)
  {
    return this.http.post<Post>(`${this.BASE_URL}/Posts`, newPost, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)}); 
  }

  GetAllPosts()
  {
    return this.http.get<Post[]>(`${this.BASE_URL}/Posts`);
  }

  EditPost(token: string, postId: number, post: object)
  {
    return this.http.patch<Post>(`${this.BASE_URL}/Posts/${postId}`, post, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)}); 
  }

  DeletePost(token: string, postId: number)
  {
    return this.http.delete<Post>(`${this.BASE_URL}/Posts/${postId}`, {headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)});  
  }
  
}
