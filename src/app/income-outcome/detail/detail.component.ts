import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IncomeOutcome } from 'src/app/core/models/incomes-outcome.model';
import { IncomeOutcomeService } from 'src/app/core/services/income-outcome.service';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: ['.span-header{cursor:pointer} .fas{cursor:pointer;margin-left:20px}'
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  incomesOutcomes:IncomeOutcome[];
  incomesOutcomesSubs:Subscription;
  orderBy:string;
  headers:{label:string,key:string,order:'ascendant'| 'descendant'}[]=[
    {label:'Descripción',key:'description',order:'ascendant'},
    { label: 'Monto', key: 'amount', order: 'ascendant'},
    { label: 'Tipo', key: 'type', order: 'ascendant'}
  ]

  get order(){
    return this.headers.find((header)=> header.key === this.orderBy )?.order;
  }
  constructor(private store:Store<AppState>, private incomeOutcomeService:IncomeOutcomeService) { }

  ngOnInit(): void {
    this.incomesOutcomesSubs = this.store.select('incomesOutcomes').subscribe(({items})=>{
      this.incomesOutcomes = [...items];
    });
  }
  ngOnDestroy() {
    this.incomesOutcomesSubs.unsubscribe();
  }

  remove(uid:string){
    this.incomeOutcomeService.deleteOutcomeIncome(uid).subscribe();
  }

  switchOrder(){
    const header = this.headers.find((header) => header.key === this.orderBy);
    header.order = header.order === 'ascendant' ? 'descendant': 'ascendant';
  }

  switchCriteria(criteria:string){
   this.orderBy = criteria;
  }


}
