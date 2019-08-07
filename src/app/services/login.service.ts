import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from '../API/app.api';
import { CanActivate } from '@angular/router';

@Injectable()
export class LoginService implements CanActivate {
    constructor(private httpCliente: HttpClient) { }

    public validarUsuario(usuario) {
        console.log(usuario)
    }
    canActivate(): boolean {
        //se o usuario estiver autenticado ira retornar true caso contrario false
        //pois aqui ira autorizar acessar outras rotas
        return true;
    }
}