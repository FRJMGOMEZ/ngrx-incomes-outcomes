import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) {
    this.loginForm = this.fb.group({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required)
    })
   }

  ngOnInit(): void {
  }
  login(){
    const {email,password} = this.loginForm.value;
    this.authService.login(email,password).subscribe((res)=>{
      this.router.navigate(['/']);   
    });
  }

}
