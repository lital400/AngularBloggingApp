import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '../login/services/auth-guard.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  constructor(private router: Router, private authGuardService: AuthGuardService) { }

  userLoggedIn: boolean;

  ngOnInit(): void {
    this.authGuardService.UserStateChanged.subscribe(userState => {
      this.userLoggedIn = userState;
    });
  }

  LogOutUser() {
    this.authGuardService.LogOutUser();
    this.router.navigate(['/posts']);
  }
}
