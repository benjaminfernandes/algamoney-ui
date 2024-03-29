import { RelatoriosModule } from './relatorios/relatorios.module';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NaoAutorizadoComponentComponent } from './core/nao-autorizado-component/nao-autorizado-component.component';

const routes: Routes = [
  { path: 'lancamentos', loadChildren: () => import('./lancamentos/lancamentos.module').then(m => m.  LancamentosModule) },
  { path: 'pessoas', loadChildren: () => import('./pessoas/pessoas.module').then(m => m.PessoasModule) },
  {path : 'dashboard', loadChildren: () => import('./dashboard/dashboard.module')
  .then(m => m.DashboardModule)},
  {path: 'relatorios', loadChildren: () => import('./relatorios/relatorios.module')
  .then(m => m.RelatoriosModule)},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'nao-autorizado', component: NaoAutorizadoComponentComponent },
  //{path: '**', redirectTo:'pagina-nao-encontrada'}
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes),
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
