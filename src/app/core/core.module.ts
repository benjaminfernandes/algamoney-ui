import { RelatoriosService } from './../relatorios/relatorios.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { AuthService } from './../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponentComponent } from './nao-autorizado-component/nao-autorizado-component.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponentComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    ConfirmDialogModule,
    RouterModule
  ],

  exports: [
    NavbarComponent,
    ToastrModule,
    ConfirmDialogModule
  ],

  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    DashboardService,
    RelatoriosService,
    ConfirmationService,
    ToastrService,
    Title,
    AuthService,

    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
