import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  //lancamento = new Lancamento();
  formulario!: FormGroup;

  constructor(
    private categoriaService: CategoriasService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastrService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    const codigoLancamento = this.route.snapshot.params['codigo'];

    this.title.setTitle('Novo Lançamento');

    if(codigoLancamento){
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      codigo: [null],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  validarObrigatoriedade(input: FormControl){
    //pegar outras propriedades do form
    //const dtVencimento = input.root.get('dataVencimento')?.value;
    return (input.value ? null : { obrigatoriedade: true })
  }

  validarTamanhoMinimo(valor: number){
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor ? null : {tamanhoMinimo: {tamanho: valor}} )
    }
  }

  getEditando(){
    return Boolean(this.formulario?.get('codigo')?.value);
  }

  carregarLancamento(codigo: Number){
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(){
    if (this.getEditando()){
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento(){
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamentoAdicionado => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        //form.reset();
        //this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos/', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(){
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);

        this.toasty.success('Lançamento alterado com sucesso!');
        this.atualizarTituloEdicao();
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

  novo(){
    this.formulario.reset(new Lancamento);
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.formulario?.get('descricao')?.value}`);
  }
}
