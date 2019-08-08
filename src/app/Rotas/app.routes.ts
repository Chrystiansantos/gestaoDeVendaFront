import { Routes } from '@angular/router'

import { LoginComponent } from '../login/login.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { HomeComponent } from '../home/home.component';
import { ProdutoComponent } from '../produto/produto.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { LoginService } from '../services/login.service';
import { PagamentoComponent } from '../pagamento/pagamento.component';

/*     { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [LoginService] },
    { path: 'cliente', component: ClienteComponent, canActivate: [LoginService] },
    { path: 'produto', component: ProdutoComponent, canActivate: [LoginService] },
    { path: 'usuario', component: UsuarioComponent, canActivate: [LoginService] },
    { path: 'pagamento', component: PagamentoComponent, canActivate: [LoginService] }, */
export const ROUTES: Routes = [
    /* { path: '', component: HomeComponent, canActivate: [LoginService] }, */
    { path: 'cliente', component: ClienteComponent, canActivate: [LoginService] },
    { path: 'produto', component: ProdutoComponent, canActivate: [LoginService] },
    { path: 'usuario', component: UsuarioComponent, canActivate: [LoginService] },
    { path: 'pagamento', component: PagamentoComponent, canActivate: [LoginService] },

]