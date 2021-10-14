import { Component } from '@angular/core';
import { AlertService } from './core/services/alert.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService:AuthService, private alertService:AlertService){
    this.authService.initAuthListener();
  }
  title = 'income-outcome-app';
}
