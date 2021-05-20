import { Router } from '@angular/router';
import { ErrorHandlerService } from './../error-handler.service';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ){

  }
  exibindoMenu = false;

  logout(){
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      }).catch(error => this.errorHandler.handle(error));
  }

}
