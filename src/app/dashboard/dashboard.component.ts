import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IncomeOutcomeService } from '../core/services/income-outcome.service';
import { AppState } from '../store/app.reducer';
import * as incomesOutcomesActions from '../store/incomes-outcomes.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  incomesOutcomesSubs: Subscription;
  userSubs:Subscription;
  constructor(private store:Store<AppState>, private incomesOutcomesService:IncomeOutcomeService) { }

  ngOnInit(): void {
   this.userSubs = this.store.select('auth').pipe(
      filter(auth => auth.user !== null )
    ).subscribe((res)=>{ 
    this.incomesOutcomesSubs =  this.incomesOutcomesService.initIncomesOutcomesListener().subscribe((items: any) => {
        this.store.dispatch(incomesOutcomesActions.setItems({ items: [...items] }))
      });
    });
  }

  ngOnDestroy(){
   this.userSubs.unsubscribe();
   this.incomesOutcomesSubs.unsubscribe();
  }

}
