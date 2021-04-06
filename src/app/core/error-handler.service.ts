import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: ToastrService) { }

  handle(errorResponse: any){
    this.toasty.error('Erro ao processar serviço remoto. Tente novamente.');
  }
}
