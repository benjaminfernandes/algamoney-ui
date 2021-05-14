import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(
    private http: HttpClient
  ) { }

  listarTodos(): Promise<any>{

    return this.http.get(this.categoriasUrl)
      .toPromise();
  }
}
