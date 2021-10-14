import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppState } from 'src/app/store/app.reducer';
import * as uiActions from 'src/app/store/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  loading:boolean = false;
  loadingSubs:Subscription;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe((ui)=>{
       this.loading = ui.authLoading;
     });
  }

  createUser(){
    this.store.dispatch(uiActions.isLoading());
    const {name,email,password} = this.registerForm.value; 
    this.authService.createUser(name, email, password).subscribe(credentials => {
        this.router.navigate(['/']);
        this.store.dispatch(uiActions.stopLoading());
    })
  }
  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }

}
