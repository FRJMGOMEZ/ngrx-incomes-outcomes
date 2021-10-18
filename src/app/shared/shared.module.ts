import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoadingComponent } from './components/btn-loading/btn-loading.component';
import { OrderItemsPipe } from './pipes/order-items.pipe';


@NgModule({
  declarations: [
    BtnLoadingComponent,
    OrderItemsPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    BtnLoadingComponent,
    OrderItemsPipe
  ]
})
export class SharedModule { }
