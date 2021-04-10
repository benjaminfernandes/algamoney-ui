import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PessoaFiltro{
  nome!: string;
  pagina = 0;
  itensPorPagina = 5;
}

export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(
    private http: HttpClient
  ) {}

  excluir(codigo: Number): Promise<void>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers})
        .toPromise()
          .then();
  }

  pesquisar(filtro: PessoaFiltro): Promise<any>{
    let params = new HttpParams();
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, {headers, params})
    .toPromise()
    .then(response => {
      const pessoas = response['content']
      const resultado = {
        pessoas,
        total: response['totalElements']
      }
      return resultado;
    });
  }

  mudarStatusPessoa(codigo: Number, status: boolean): Promise<void>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append("Content-Type", "application/json");

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status, {headers})
      .toPromise()
        .then();
  }

  listarTodos(): Promise<any>{
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.get('this.pessoasUrl', { headers })
      .toPromise()
        .then(response => response['content']);
  }
}
