import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FormControl } from '@angular/forms';
import { Pessoa } from './../../core/model';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastrService
  ) { }

    pessoa = new Pessoa()

  ngOnInit(): void {

  }

  salvar(form: FormControl){

    this.pessoa.ativo = true;
    this.pessoaService.salvar(this.pessoa)
      .then(() => {

        this.toasty.success('Pessoa cadastrada com sucesso!');
        this.pessoa = new Pessoa()
        form.reset();
      })
      .catch(erro => this.errorHandler.handle(erro))
  }
}
