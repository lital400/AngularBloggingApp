import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newUser: User;
  errorMsg = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.newUser = new User;
  }

  CreateNewUser()
  {
    this.userService.CreateNewUser(this.newUser).subscribe((returnedUserData) => {
      console.log(`User Created: ${JSON.stringify(returnedUserData)}`);
      this.errorMsg = '';
      this.router.navigate(['/login']);
    }, (error) => {
      console.log(error);
      this.errorMsg = error.error.message;   // CHANGE TO messsage when using https://unf.josecgomez.dev/
    })
  }
}
