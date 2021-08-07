import { environment } from './../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade, Estado, Pessoa } from '../core/model';

@Injectable({
  providedIn: 'root'
})

export class PessoaFiltro{
  nome!: string;
  pagina = 0;
  itensPorPagina = 5;
}

export class PessoaService {

  pessoasUrl!: string;
  cidadesUrl!: string;
  estadosUrl!: string;

  constructor(
    private http: HttpClient
  ) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  excluir(codigo: Number): Promise<void>{

      return this.http.delete(`${this.pessoasUrl}/${codigo}`)
        .toPromise()
          .then();
  }

  pesquisar(filtro: PessoaFiltro): Promise<any>{
    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, {params})
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

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status)
      .toPromise()
        .then();
  }

  listarTodos(): Promise<any>{

      return this.http.get(this.pessoasUrl)
      .toPromise()
        .then(response => response['content']);
  }

  buscaPorCodigo(codigo: Number): Promise<Pessoa>{
      return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
        .toPromise();
  }

  salvar(pessoa: Pessoa): Promise<Pessoa>{

      return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
        .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa>{

      return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
        .toPromise();
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl).toPromise();
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new HttpParams()
      .set('estado', estado);

    return this.http.get<Cidade[]>(this.cidadesUrl, { params }).toPromise();
  }
}
