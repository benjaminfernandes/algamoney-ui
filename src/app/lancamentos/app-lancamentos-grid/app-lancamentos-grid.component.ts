import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-app-lancamentos-grid',
  templateUrl: './app-lancamentos-grid.component.html',
  styleUrls: ['./app-lancamentos-grid.component.css']
})
export class AppLancamentosGridComponent {

  @Input() lancamentos = [];
  @Input() totalRegistros;
  @Input() itensPorPagina;

  @Output() @ViewChild('tabela') grid;

  @Output() aoMudarPagina = new EventEmitter();
  @Output() lancamentoExcluir = new EventEmitter();

  mudarPagina(event) {
    this.aoMudarPagina.emit(event);
  }

  excluir(lancamento: any){
    this.lancamentoExcluir.emit(lancamento);
    this.grid.reset();
  }
}
