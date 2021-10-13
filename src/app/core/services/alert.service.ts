import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  loadingAlert(text:string){
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
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
      footer: '<a href="">Why do I have this issue?</a>'
    });
  }
}
