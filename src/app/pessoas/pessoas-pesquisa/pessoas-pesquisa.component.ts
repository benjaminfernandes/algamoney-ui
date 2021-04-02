import { LazyLoadEvent } from 'primeng/api';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit{

  filtro = new PessoaFiltro()
  totalRegistros = 0;
  pessoas = [];

  constructor(private pessoaService: PessoaService){}

  ngOnInit(){
    this.pesquisar();
  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        console.log(resultado)
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }
 
  aoMudarPagina(event: LazyLoadEvent){
    const pagina = (event.first! / event.rows!);
    this.pesquisar(pagina);
  }
}
