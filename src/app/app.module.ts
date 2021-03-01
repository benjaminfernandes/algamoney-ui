import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppComponent } from './app.component';
import {TooltipModule} from 'primeng/tooltip';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { MessageComponent } from './message/message.component';
import { AppLancamentosGridComponent } from './app-lancamentos-grid/app-lancamentos-grid.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';



registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent,
    NavbarComponent,
    PessoasPesquisaComponent,
    LancamentoCadastroComponent,
    PessoaCadastroComponent,
    MessageComponent,
    AppLancamentosGridComponent,
    PessoasGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    FormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
