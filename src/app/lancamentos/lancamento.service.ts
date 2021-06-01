import { environment } from './../../environments/environment';
import { Lancamento } from './../core/model';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';

export class LancamentoFiltro{
  descricao: string = "";
  dataVencimentoInicio!: Date;
  dataVencimentoFim!: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl!: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any>{
    let params = new HttpParams();

      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());

      if(filtro.descricao){
        params = params.set('descricao', filtro.descricao);
      }

      if(filtro.dataVencimentoInicio){
       params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio)
        .format('YYYY-MM-DD'));
      }

      if(filtro.dataVencimentoFim){
       params = params.set('dataVencimentoFim', moment(filtro.dataVencimentoFim)
        .format('YYYY-MM-DD'));
      }

      return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
        .toPromise()
        .then(response => {
          const lancamentos = response['content']
          const resultado = {
            lancamentos,
            total: response['totalElements']
          }
          return resultado;
        });
  }

  excluir(codigo: number): Promise<void>{

      return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
        .toPromise()
        .then();
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento>{

      return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
        .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento>{

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
      .toPromise()
        .then(response => {
          const lancamentoAlterado = response;
          this.converterStringsParaDate([lancamentoAlterado]);
          return lancamento;
        });
  }

  buscarPorCodigo(codigo: Number): Promise<Lancamento>{

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
        .then(response =>{
          const lancamento = response;
          this.converterStringsParaDate([lancamento]);
          return lancamento;
        });
  }

  private converterStringsParaDate(lancamentos: Lancamento[]){
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
