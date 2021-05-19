import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { nextTick } from 'process';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.auth.isAccessTokenInvalido()){

        return this.auth.obterNovoAccessToken()
          .then(() => {

            if(this.auth.isAccessTokenInvalido()){
              this.router.navigate(['/login']);
              return false;
            }

            return true;
          });
      } else if(route.data.roles && !this.auth.temQualquerPermissao(route.data.roles)){
        this.router.navigate(['/nao-autorizado']);
        return false;
      }

    return true;
  }

}
