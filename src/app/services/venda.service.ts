import { HttpClient } from '@angular/common/http';
import { URL_API } from '../API/app.api';
import { Injectable } from '@angular/core';
import { Venda } from 'src/shared/venda.model';
import { Observable } from 'rxjs';




@Injectable()
export class VendaService {

    constructor(private httpCliente: HttpClient) { }

    public cadastrarVenda(venda: Venda) {
        console.log(venda)
        return this.httpCliente.post(`${URL_API}/venda`, venda)
    }
}