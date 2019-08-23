import { Routes } from '@angular/router'

import { ClienteComponent } from '../cliente/cliente.component';
import { ProdutoComponent } from '../produto/produto.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { PagamentoComponent } from '../pagamento/pagamento.component';
import { LoginService } from '../services/login.service';
import { VendaComponent } from '../venda/venda.component';

export const ROUTES: Routes = [
    //{ path: '', component: HomeComponent, canActivate: [LoginService] },
    { path: 'cliente', component: ClienteComponent, canActivate: [LoginService] },
    { path: 'produto', component: ProdutoComponent, canActivate: [LoginService] },
    { path: 'usuario', component: UsuarioComponent, canActivate: [LoginService] },
    { path: 'pagamento', component: PagamentoComponent, canActivate: [LoginService] },
    { path: 'venda', component: VendaComponent, canActivate: [LoginService] }

]