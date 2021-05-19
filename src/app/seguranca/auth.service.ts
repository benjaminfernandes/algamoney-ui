import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
    ) {
      this.carregarToken();
     }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response['access_token']);
      })
      .catch(response => {
        if(response.status === 400){
          if(response.error.error === 'invalid_grant'){

            return Promise.reject('Usuário ou senha inválidos');
          }
        }
        return Promise.reject(response);
      });
  }

  temPermissao(permissao: string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response['access_token']);

        console.log('Novo access token criado!');

      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
      });
  }

  isAccessTokenInvalido(){
    const token = localStorage.getItem('token');

    return !token || this.jwtHelperService.isTokenExpired(token);
  }

  private armazenarToken(token: string){
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken(){
    const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }

  temQualquerPermissao(roles){
    for(const role of roles){
      if(this.temPermissao(role)){
        return true;
      }
    }

    return false;
  }

  limparAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }
}
