import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL='http://localhost:3000';    // works with my Node.js Express back end API 
  

  constructor(private http: HttpClient) { }

  CreateNewUser(newUser: User)
  {
    return this.http.post<User>(`${this.BASE_URL}/Users`, newUser);
  }

  Login(userName:string, password:string)
  {
    return this.http.get<Token>(`${this.BASE_URL}/Users/${userName}/${password}`);
  }

}
