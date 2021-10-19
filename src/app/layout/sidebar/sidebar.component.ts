import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ["a{cursor:pointer}"
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  user:User;
  userSubs:Subscription;
  constructor(private authService:AuthService, private router:Router,private store:Store<AppState>) { }

  ngOnInit(): void {
   this.userSubs = this.store.select('auth').subscribe(({user})=>{
      this.user = user; 
    });
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }


  logout(){
    this.authService.logout().then(()=> this.router.navigate(['auth']) )
  }

}
