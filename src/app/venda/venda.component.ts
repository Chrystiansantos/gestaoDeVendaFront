import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from 'src/shared/produto.model';
import { Cliente } from 'src/shared/cliente.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css'],
  providers: [ClienteService, ProdutoService]
})
export class VendaComponent implements OnInit {

  constructor(private clienteService: ClienteService, private produtoService: ProdutoService) { }

  public produtos: Produto[];
  public clientes: Cliente[];
  //onde irei armazenar os produtos a mostrar na tablela
  public listaProdutos: Produto[] = [];
  public idCliente: string;
  public produtoSelecionado: FormGroup = new FormGroup({
    'clienteId': new FormControl('Clientes'),
    'produtoId': new FormControl('Produtos')
  })

  ngOnInit() {
    this.carregarProdutosEClientes();
  }
  public carregarProdutosEClientes(): void {
    this.clienteService.getClientes().subscribe((result: Cliente[]) => {
      this.clientes = result;
    })
    this.produtoService.getProdutos().subscribe((result: Produto[]) => {
      this.produtos = result;
    })
  }

  public inserirProduto(): void {
    //aqui ira salvar o id do cliente
    this.idCliente = this.produtoSelecionado.value.clienteId;
    //aqui sera responsavel por alimentar o arrai que sera mostrado na tabela
    if (this.listaProdutos.length > 0) {
      //aqui irei verificar se ja inserir o produto no array
      let i = 0;
      var produtoJaInserido: Boolean = false;
      while (i < this.listaProdutos.length) {
        if (this.listaProdutos[i]._id == this.produtoSelecionado.value.produtoId) {
          produtoJaInserido = true;
        }
        i++;
      }
    }
    //aqui caso tenha inserido irei aumentar a quantidade ou adicionar um novo
    if (produtoJaInserido) {
      console.log('irei adicionar mais uma na quantidade de produtos')
    } else {
      //LOOPING INFINITO AQUI
      console.log(this.produtos)
      let a = 0;
      while (a < this.produtos.length) {
        if (this.produtos[a]._id == this.produtoSelecionado.value.produtoId) {
          this.listaProdutos.push(this.produtos[a])
          let auxPosicao = this.listaProdutos.length
          this.listaProdutos[auxPosicao - 1].qtd = 1;
        }
        a++;
      }
    }
    console.log(this.listaProdutos);
  }
}