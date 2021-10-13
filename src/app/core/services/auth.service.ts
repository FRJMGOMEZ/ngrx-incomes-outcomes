import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth, private alertService:AlertService, private firestore:AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe((fUser)=>{
        console.log({fUser});
    });
  }

  createUser(name:string,email:string,password:string){
    this.alertService.loadingAlert('Registering in...');
    return from(this.auth.createUserWithEmailAndPassword(email, password)).pipe(
      tap(() => { 
      Swal.close();
      }),
      switchMap(({ user })=>{
        const newUser = new User(user.uid, name, user.email);
        return from(
        this.firestore
          .doc(`${user.uid}/user`)
          .set({...newUser}))
      }),
      catchError(err => {
        this.alertService.errorAlert(err);
        throw new Error(err.message);
      })
    );
  }

  login(email:string,password:string){
    this.alertService.loadingAlert('Loging in...');
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => { Swal.close() }),
      catchError(err => {
        this.alertService.errorAlert(err);
        throw new Error(err.message);
      })
    );
  }

  logout(){
   return this.auth.signOut();
  }

  isAuth(){
    return (this.auth.authState as any).pipe(map((fUser)=> fUser !== null));
  }

}
