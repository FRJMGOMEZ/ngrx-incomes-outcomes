import { Injectable} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { from, throwError} from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import { IncomeOutcome } from '../models/incomes-outcome.model';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import * as uiActions from '../../store/ui.actions';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IncomeOutcomeService{


  incomesOutcomes:IncomeOutcome[];

  constructor(private firestore:AngularFirestore, private authService:AuthService, private alertService:AlertService, private store:Store<AppState>) { }

  createIncomeOutcome(incomeOutcome:IncomeOutcome){
    return this.firestore.doc(`${this.authService.user.uid}/incomes-outcomes`)
     .collection('items')
     .add({...incomeOutcome})
     .catch((err)=>{
        this.alertService.errorAlert(err.message);
     });
  }

  initIncomesOutcomesListener(){
    return from(this.firestore.collection(`${this.authService.user.uid}/incomes-outcomes/items`).valueChanges({ idField: 'uid' }))
   }

  deleteOutcomeIncome(uidItem:string){
    this.store.dispatch(uiActions.modalLoading());
    return from(this.firestore.doc(`${this.authService.user.uid}/incomes-outcomes/items/${uidItem}`).delete()).pipe(
      tap(()=>{this.store.dispatch(uiActions.modalLoadingStop())}),
      catchError((err)=>{ this.alertService.errorAlert(err.message); throw new Error(err) })
    )
  }
  
   
}
