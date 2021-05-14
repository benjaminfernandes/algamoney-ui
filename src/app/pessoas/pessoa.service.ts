import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';

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
}
