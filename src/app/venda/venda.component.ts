import { Component, OnInit, OnChanges } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { ProdutoService } from '../services/produto.service';
import { Produto } from 'src/shared/produto.model';
import { Cliente } from 'src/shared/cliente.model';
import { FormGroup, FormControl } from '@angular/forms';
import { faAngleLeft, faAngleRight, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css'],
  providers: [ClienteService, ProdutoService]
})
export class VendaComponent implements OnInit {

  constructor(private clienteService: ClienteService, private produtoService: ProdutoService) { }

  public faAngleLeft = faAngleLeft;
  public faAngleRight = faAngleRight;
  public faTrash = faTrash;

  public produtos: Produto[];
  public clientes: Cliente[];
  //onde irei armazenar os produtos a mostrar na tablela
  public listaProdutos: Produto[] = [];
  public mostrarBotaoCompra: boolean;
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
      this.aumentarProduto(this.produtoSelecionado.value.produtoId);
    } else {
      let a = 0;
      while (a < this.produtos.length) {
        if (this.produtos[a]._id == this.produtoSelecionado.value.produtoId) {
          this.listaProdutos.push(new Produto(this.produtos[a]._id, this.produtos[a].codigo, this.produtos[a].marca,
            this.produtos[a].modelo, this.produtos[a].cor, this.produtos[a].preco, this.produtos[a].tamanho,
            this.produtos[a].qtd, this.produtos[a].descricao));
          let auxPosicao = this.listaProdutos.length;
          this.listaProdutos[auxPosicao - 1].qtd = 1;
        }
        a++;
      }
    }
    this.verificarBotao();
  }
  public diminuirProduto(produtoId: string) {
    for (let x = 0; x < this.listaProdutos.length; x++) {
      if (this.listaProdutos[x]._id == produtoId && this.listaProdutos[x].qtd > 1) {
        this.listaProdutos[x].qtd--;
      }
    }
    this.verificarBotao();
  }
  public aumentarProduto(produtoId: string) {
    console.log(this.mostrarBotaoCompra);
    let produtos;
    for (let x = 0; x < this.produtos.length; x++) {
      if (this.produtos[x]._id == produtoId) {
        produtos = this.produtos[x];
      }
    }
    for (let y = 0; y < this.listaProdutos.length; y++) {
      if (this.listaProdutos[y]._id == produtoId && produtos.qtd > this.listaProdutos[y].qtd) {
        this.listaProdutos[y].qtd++;
      }
    }
    this.verificarBotao();
  }
  removerProduto(produtoId: string) {
    let x = 0
    while (x < this.listaProdutos.length) {
      if (this.listaProdutos[x]._id = produtoId) {
        this.listaProdutos.splice(x);
      }
      x++;
    }
    this.verificarBotao();
  }
  verificarBotao() {
    (this.listaProdutos.length > 0) ? this.mostrarBotaoCompra = true : this.mostrarBotaoCompra = false;
  }

}