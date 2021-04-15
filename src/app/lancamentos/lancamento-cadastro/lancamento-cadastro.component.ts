import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value:'RECEITA'},
    { label: 'Despesa', value:'DESPESA'}
  ];

  pessoas = [
    {label: 'João da Silva', value: 1},
    {label: 'Sebastião Souza', value: 2},
    {label: 'Maria Abadia', value: 3}
  ];

  categorias = [];

  constructor(
    private categoriaService: CategoriasService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }
//Aula 17.17
  carregarCategorias(){
    return this.categoriaService.listarTodos()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return {label: c.nome, value: c.codigo};
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
