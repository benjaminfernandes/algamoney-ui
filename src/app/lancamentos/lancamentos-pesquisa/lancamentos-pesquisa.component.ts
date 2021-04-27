import { Component, OnInit} from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  constructor(
    private lancamentoService: LancamentoService,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ){}

  ngOnInit(){
    //this.pesquisar();
    this.title.setTitle('Pesquisa de lançamentos')
  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = (event.first! / event.rows!);
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any){
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  private excluir (lancamento: any){

    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.pesquisar();

        this.toastr.success('Lançamento excluído com sucesso!', 'Mensagem!',{
          timeOut: 5000,
          progressBar: true
        })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
