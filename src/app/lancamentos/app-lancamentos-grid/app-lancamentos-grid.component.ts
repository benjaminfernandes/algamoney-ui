import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-lancamentos-grid',
  templateUrl: './app-lancamentos-grid.component.html',
  styleUrls: ['./app-lancamentos-grid.component.css']
})
export class AppLancamentosGridComponent {

  @Input() lancamentos = [];

}
