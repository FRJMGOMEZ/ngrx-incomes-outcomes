import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router, private alertService:AlertService) {
    this.registerForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', Validators.required)
    })
   }

  ngOnInit(): void {
  
  }

  createUser(){
    const {name,email,password} = this.registerForm.value; 
    this.authService.createUser(name, email, password).subscribe(credentials => {
        this.router.navigate(['/']);
    })
  }

}
