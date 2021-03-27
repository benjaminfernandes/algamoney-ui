import { LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  descricao: string = "";
  lancamentos = [];

  constructor(private LancamentoService: LancamentoService){}

  ngOnInit(){
    this.pesquisar();
  }

  pesquisar(){
    this.LancamentoService.pesquisar({ descricao: this.descricao })
      .then(lancamentos => this.lancamentos = lancamentos);
  }
}
