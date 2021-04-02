import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
 
mudarPagina(event) {
    this.aoMudarPagina.emit(event);
  }
}
