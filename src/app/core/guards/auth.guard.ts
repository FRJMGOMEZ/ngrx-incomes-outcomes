import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private authService: AuthService,private router:Router){}
  canLoad():Observable<boolean>  {
    return this.authService.isAuth().pipe(tap(status => !status ? this.router.navigate(['auth/login']) : null ),take(1))
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(tap(status => !status ? this.router.navigate(['auth/login']) : null))
  }
  
}
