import { EventEmitter, Injectable, Output } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { Token } from 'src/app/users/models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  @Output() UserStateChanged = new EventEmitter<boolean>();

  mySubscription: any;
  
  constructor(private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.mySubscription = this.router.events.subscribe((event) => { 
      if (event instanceof NavigationEnd) { 
        this.router.navigated = false;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authToken = localStorage.getItem('token');
    if(authToken != null)
    {
      return true;
    }
    else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }

  SetUserLoggedIn(authToken: Token) {
    localStorage.setItem('token', JSON.stringify(authToken));
    this.UserStateChanged.emit(true);
    this.router.navigate(['/new-post']); 
  }

  LogOutUser() {
    localStorage.removeItem('token');
    this.UserStateChanged.emit(false);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/posts']);
    }); 
  }

  GetCurrentUserToken()
  {
    const userToken = localStorage.getItem('token');
    let tokenObj = JSON.parse(userToken);
    if(tokenObj != null)
      return tokenObj.token;
    else
      return '';
  }
  
}
