import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Router } from '@angular/router'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClienteComponent } from './cliente/cliente.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProdutoComponent } from './produto/produto.component';
import { HomeComponent } from './home/home.component';
//ROTAS
import { ROUTES } from './rotas/app.routes';
import { PagamentoComponent } from './pagamento/pagamento.component';
//FontAwesomeModule
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VendaComponent } from './venda/venda.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClienteComponent,
    UsuarioComponent,
    ProdutoComponent,
    HomeComponent,
    PagamentoComponent,
    VendaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
