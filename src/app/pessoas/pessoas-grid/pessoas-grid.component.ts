import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

@Input() pessoas = [];
@Input() totalRegistros;
@Input() itensPorPagina;

@Output() aoMudarPagina = new EventEmitter();
@Output() @ViewChild('tabela') grid;
@Output() pessoaExcluir = new EventEmitter();
@Output() eventoAlterarStatus = new EventEmitter();

mudarPagina(event) {
    this.aoMudarPagina.emit(event);
  }

excluir(event){
    this.pessoaExcluir.emit(event);
    this.grid.reset();
  }

alterarStatus(event){
    this.eventoAlterarStatus.emit(event);
  }
}
