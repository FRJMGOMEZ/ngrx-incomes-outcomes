import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/store/app.reducer';
import * as uiActions from 'src/app/store/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loading:boolean = false;
  loginForm:FormGroup;
  loadingSubs:Subscription;
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router, private store:Store<AppState>) {
    this.loginForm = this.fb.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required)
    });
   }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe((ui)=>{
    this.loading = ui.btnLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
  login(){
    const {email,password} = this.loginForm.value;
    this.store.dispatch(uiActions.btnLoading())
    this.authService.login(email,password)
    .pipe(catchError((err)=>{
     this.store.dispatch(uiActions.btnLoadingStop());
     return null
    }))
    .subscribe((res)=>{
      this.router.navigate(['/']).then(()=>{
        this.store.dispatch(uiActions.btnLoadingStop());
      });   
    });
  }

}
