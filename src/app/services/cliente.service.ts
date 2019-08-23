import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from '../API/app.api';
import { Cliente } from 'src/shared/cliente.model';
import { Observable } from 'rxjs';
@Injectable()
export class ClienteService {
    constructor(private httpClient: HttpClient) { }

    public cadastrarCliente(cliente: Cliente) {
        return this.httpClient.post(`${URL_API}/cliente`, cliente)
    }
    public getClientes() {
        return this.httpClient.get(`${URL_API}/cliente`);
    }
    public deletarCliente(cliente: Cliente) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: { id: cliente._id }
        };
        return this.httpClient.delete(`${URL_API}/cliente`, options)
    }

    public atualizarCliente(cliente: Cliente) {
        return this.httpClient.put(`${URL_API}/cliente`, cliente);
    }
}