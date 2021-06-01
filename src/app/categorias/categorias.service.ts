import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriasUrl!: string;

  constructor(
    private http: HttpClient,
  ) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }

  listarTodos(): Promise<any>{

    return this.http.get(this.categoriasUrl)
      .toPromise();
  }
}
