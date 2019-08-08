import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Router } from '@angular/router'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { ClienteComponent } from './cliente/cliente.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProdutoComponent } from './produto/produto.component';
import { HomeComponent } from './home/home.component';
//ROTAS
import { ROUTES } from '../app/Rotas/app.routes';
import { PagamentoComponent } from './pagamento/pagamento.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClienteComponent,
    UsuarioComponent,
    ProdutoComponent,
    HomeComponent,
    PagamentoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
