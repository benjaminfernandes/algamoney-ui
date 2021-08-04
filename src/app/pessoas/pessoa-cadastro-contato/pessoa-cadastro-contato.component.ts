import { FormControl } from '@angular/forms';
import { Contato } from './../../core/model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos!: Array<Contato>;
  contato!: Contato;
  exibindoFormularioContato = false;
  contatoIndex!: number;

  constructor() { }

  ngOnInit(): void {
  }

  prepararNovoContato(){
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  prepararEdicaoContato(contato: Contato, index: number){
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(form: FormControl){
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato)
    this.exibindoFormularioContato = false;
    form.reset();
  }

  removerContato(index: number){
    this.contatos.splice(index, 1);
  }

  clonarContato(contato: Contato): Contato{
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }

  getEditando(){
    return this.contato && this.contato.codigo;
  }

}
