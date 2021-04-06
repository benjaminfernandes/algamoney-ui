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

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    ConfirmDialogModule,
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
    ConfirmationService,
    ToastrService,
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
