import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../API/app.api';
import { CanActivate } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class LoginService implements CanActivate {
    constructor(private httpCliente: HttpClient) { }
    public url: string = `${URL_API}/usuarioValido`
    private logado: boolean = true;
    public validarUsuario(usuario) {
        return this.httpCliente.post(this.url, usuario)
    }
    setLogado(): void {
        this.logado = true;
    }
    setDeslogado(): void {
        this.logado = false;
    }
    canActivate(): boolean {
        //se o usuario estiver autenticado ira retornar true caso contrario false
        //pois aqui ira autorizar acessar outras rotas
        console.log('ola can actionvate', this.logado)
        return this.logado;
    }
}