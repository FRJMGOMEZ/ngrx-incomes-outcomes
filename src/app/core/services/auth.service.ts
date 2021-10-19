import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { from, Subscription } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import * as authActions from 'src/app/auth/store/auth.actions';
import * as incomesOutcomesActions from '../../income-outcome/store/incomes-outcomes.actions';
import Swal from 'sweetalert2';
import { User } from '../models/user.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  userSubs:any;
  authSubs:Subscription;
  private _user:User;
  get user(){
    return {...this._user}
  }
  constructor(private auth:AngularFireAuth, private alertService:AlertService, private firestore:AngularFirestore, private store:Store<AppState>) { }

  ngOnDestroy(){
    this.authSubs? this.authSubs.unsubscribe() : null;
  }

  initAuthListener(){
    this.authSubs = this.store.select('auth').subscribe((auth) => {
      this._user = auth.user;
    });
    
    this.auth.authState
    .subscribe((fUser)=>{
      if(fUser){
       this.userSubs = this.firestore.doc(`${fUser.uid}/user`).valueChanges().subscribe((user:any)=>{
         const firestoreUser = User.fromFirebase(user);
         this.store.dispatch(authActions.setUser({user:firestoreUser}));
        });
      }else{
       this.cleanStore();
        this.userSubs?.unsubscribe();
      } 
    });
  }

  cleanStore(){
    this.store.dispatch(authActions.unsetUser());
    this.store.dispatch(incomesOutcomesActions.unsetItems())
  }

  createUser(name:string,email:string,password:string){
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
    return from(this.auth.signInWithEmailAndPassword(email, password)).pipe(
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
