import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/services/user.service';
import { AuthGuardService } from './services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: string = '';
  password: string = '';
  errorMsg = '';
  
  constructor(private userService: UserService, private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
  }

  Login()
  {
    if(this.userId == '' || typeof this.userId == "undefined")
      this.errorMsg = 'User Id is required';
    else if(this.password == '' || typeof this.password == "undefined")
      this.errorMsg = 'Password is required';
    else {
      this.userService.Login(this.userId, this.password).subscribe((returnedToken)=>{
        this.authGuardService.SetUserLoggedIn(returnedToken);
        this.errorMsg ='';
      },(error)=>{
        this.errorMsg = error.error.message; 
      });
    }
  }
}
