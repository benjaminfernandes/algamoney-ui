import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';

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

  pessoas = [];
  categorias = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriasService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastrService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl){
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.errorHandler.handle(erro));
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

  carregarPessoas(){
    return this.pessoaService.listarTodos()
      .then(pessoas =>{

        this.pessoas = pessoas.map(p =>{
          return {label: p.nome, value: p.codigo};
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
