import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FormControl } from '@angular/forms';
import { Pessoa } from './../../core/model';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

    pessoa = new Pessoa()

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Pessoa');

    if(codigoPessoa){
      this.carregarPessoa(codigoPessoa);
    }

  }

  carregarPessoa(codigo: Number){
    this.pessoaService.buscaPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        console.log(pessoa)
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));;
  }

  getEditando(){
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: FormControl){
    if(this.getEditando()){
      this.atualizarPessoa(form);
    }else{
      this.adicionarPessoa(form);
    }
  }

  atualizarPessoa(form: FormControl){
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.toasty.success('Pessoa atualizada com sucesso');
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarPessoa(form: FormControl){

    this.pessoa.ativo = true;
    this.pessoaService.salvar(this.pessoa)
      .then(pessoaAdicionada => {

        this.toasty.success('Pessoa cadastrada com sucesso!');
        //this.pessoa = new Pessoa()
        //form.reset();
        this.router.navigate(['/pessoas/', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro))
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  novo(form: FormControl){
    form.reset(new Pessoa);
    this.router.navigate(['/pessoas/novo']);
  }
}
