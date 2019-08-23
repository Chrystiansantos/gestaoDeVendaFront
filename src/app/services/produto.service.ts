import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produto } from 'src/shared/produto.model';
import { URL_API } from '../API/app.api'
import { Observable } from 'rxjs';
import { Resposta } from 'src/shared/mensagem';
@Injectable()
export class ProdutoService {

    constructor(private httpClient: HttpClient) { }

    public cadastrarProduto(produto: Produto): Observable<any> {
        delete produto._id;
        return this.httpClient.post<Resposta>(`${URL_API}/produtos`, produto)
    }
    public getProdutos(): Observable<any> {
        return this.httpClient.get<Produto>(`${URL_API}/produtos`);
    }
    public deletarProduto(produto: Produto) {
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: { id: produto._id }
        };
        return this.httpClient.delete(`${URL_API}/produtos`, options)
    }
    public editarProduto(produto: Produto): Observable<any> {
        return this.httpClient.put(`${URL_API}/produtos`, produto);
    }
}