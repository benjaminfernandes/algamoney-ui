import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
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

  constructor(
    private pessoaService: PessoaService,
    private toastr: ToastrService,
    private errorHandler: ErrorHandlerService,
    private confirmationService: ConfirmationService,
    private title: Title
  ){}

  ngOnInit(){
    this.pesquisar();
    this.title.setTitle('Pesquisa de pessoas')
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

  excluir(codigo: Number){
    this.pessoaService.excluir(codigo)
      .then(() => {
        this.pesquisar();

        this.toastr.success('Pessoa excluída com sucesso!', 'Mensagem!',{
          timeOut: 5000,
          progressBar: true
        })
      })
      .catch(error => this.errorHandler.handle(error));
  }


  confirmarExclusao(pessoa: any){
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa.codigo);
      }
    });
  }

  mudarStatus(pessoa: any){
    this.pessoaService.mudarStatusPessoa(pessoa.codigo, !pessoa.ativo)
      .then(() => {
        this.pesquisar();

        const acao = !pessoa.ativo ? 'Ativada' : 'Desativada'

        this.toastr.success(`Pessoa ${acao} com sucesso!`, 'Mensagem!',{
          timeOut: 5000,
          progressBar: true
        })
      });
  }
}
