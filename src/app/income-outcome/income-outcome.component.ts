import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IncomeOutcome } from '../core/models/incomes-outcome.model';
import { AlertService } from '../core/services/alert.service';
import { IncomeOutcomeService } from '../core/services/income-outcome.service';
import { AppState } from '../store/app.reducer';
import * as uiActions from '../store/ui.actions';

@Component({
  selector: 'app-income-outcome',
  templateUrl: './income-outcome.component.html',
  styles: [
  ]
})
export class IncomeOutcomeComponent implements OnInit {
  type: 'income' | 'outcome' = 'income';
  incomeOutcomeForm:FormGroup;
  loading: boolean = false;
  loadingSubs: Subscription;
  constructor(private fb:FormBuilder, private incomeOutcomeService:IncomeOutcomeService, private alertService:AlertService, private store:Store<AppState>) {
    this.incomeOutcomeForm = this.fb.group({
        description:new FormControl('',Validators.required),
        amount:new FormControl(null,Validators.required)
    });
   }
  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe((ui)=>{
      this.loading = ui.btnLoading;
    });
  }
  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }

  addIncomeOutcome(){
    const {description, amount} = this.incomeOutcomeForm.value;
    const incomeOutcome = new IncomeOutcome(amount,this.type,description,null);
    this.store.dispatch(uiActions.btnLoading());
    this.incomeOutcomeService.createIncomeOutcome(incomeOutcome).then((res)=>{
       this.incomeOutcomeForm.reset(); 
       this.store.dispatch(uiActions.btnLoadingStop());
      this.alertService.succesAlert(`${this.type} succesfully created`, description);
    });
  }

  switchType(type: 'income' | 'outcome'){
    this.type = type;
    this.incomeOutcomeForm.setValue({description:'',amount:null});
  }

}
