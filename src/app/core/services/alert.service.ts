import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducer';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService  implements OnDestroy{
  loadingSubs:Subscription;
  loading:boolean = false;
  constructor(private store:Store<AppState>) {
    this.loadingSubs = this.store.select('ui').subscribe((ui) => {
      if(ui.modalLoading !== this.loading){
        ui.modalLoading ? this.loadingAlert('Loading...') : Swal.close();
        this.loading = ui.modalLoading;
      }
    }); 
  }
  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }
  private loadingAlert(text:string){
  Swal.fire({
        title:text,
        timer: 10000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          Swal.close();
        }
    })
  }
  errorAlert(err){
    Swal.close();
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
      footer: '<a href="">Why do I have this issue?</a>'
    });
  }

  succesAlert(message:string,description:string=''){
    Swal.fire(
       message,
      description,
      'success'
    )
  }
}
