import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Produto } from 'src/shared/produto.model';
import { ProdutoService } from '../services/produto.service';
import { Resposta } from 'src/shared/mensagem';
//icons
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  providers: [ProdutoService]
})
export class ProdutoComponent implements OnInit {

  private produtosCadastrados: Produto[];
  //icones
  public faEdit = faEdit;
  public faTrash = faTrash
  //Fazer as validaçoes de produto
  public telaCadastro: boolean = true;
  public msgRetorno: string;
  public respostaBoolean: boolean = null;

  public produto = new FormGroup({
    codigo: new FormControl(null),
    marca: new FormControl(null),
    modelo: new FormControl(null),
    cor: new FormControl(null),
    preco: new FormControl(null),
    tamanho: new FormControl(null),
    qtd: new FormControl(null),
    descricao: new FormControl(null)
  })

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.listarProdutos();
  }
  cadastrarProduto(): void {
    this.produtoService.cadastrarProduto(new Produto(
      null,
      this.produto.value.codigo,
      this.produto.value.marca,
      this.produto.value.modelo,
      this.produto.value.cor,
      this.produto.value.preco,
      this.produto.value.tamanho,
      this.produto.value.qtd,
      this.produto.value.descricao)).subscribe((result: Resposta) => {
        this.respostaBoolean = true;
        this.msgRetorno = result.msg;
        this.limparProduto();
        this.listarProdutos();
        this.cronometroEsconderMsg();
      }, (err: Resposta) => {
        this.respostaBoolean = false;
        this.msgRetorno = err.msg;
        this.cronometroEsconderMsg();
      })
  }
  public limparProduto(): void {
    this.produto = new FormGroup({
      id: new FormControl(null),
      codigo: new FormControl(null),
      marca: new FormControl(null),
      modelo: new FormControl(null),
      cor: new FormControl(null),
      preco: new FormControl(null),
      tamanho: new FormControl(null),
      qtd: new FormControl(null),
      descricao: new FormControl(null)
    })
  }
  public cancelar(): void {
    this.telaCadastro = true;
    this.limparProduto();
  }
  public listarProdutos(): void {
    this.produtoService.getProdutos().subscribe((result: Produto[]) => {
      this.produtosCadastrados = result;
    }, (err) => {
      this.msgRetorno = err;
      this.respostaBoolean = false;
      this.cronometroEsconderMsg();
    })
  }
  public deletarProduto(produto: Produto) {
    this.cancelar();
    this.produtoService.deletarProduto(produto).subscribe((result: Resposta) => {
      this.msgRetorno = result.msg;
      this.respostaBoolean = true;
      this.listarProdutos();
      this.cronometroEsconderMsg();
    }, err => {
      this.msgRetorno = err;
      this.respostaBoolean = false;
      this.cronometroEsconderMsg();
    })
  }
  editarProdutos(): void {
    this.produtoService.editarProduto(this.produto.value).subscribe((result: Resposta) => {
      this.msgRetorno = result.msg;
      this.respostaBoolean = true;
      this.limparProduto();
      this.listarProdutos();
      this.cronometroEsconderMsg();
    }, err => {
      this.msgRetorno = err;
      this.respostaBoolean = false;
      this.cronometroEsconderMsg();
    })
  }
  public carregarProdutoEditar(produto) {
    this.telaCadastro = false;
    this.produto = new FormGroup({
      id: new FormControl(produto._id),
      codigo: new FormControl(produto.codigo),
      marca: new FormControl(produto.marca),
      modelo: new FormControl(produto.modelo),
      cor: new FormControl(produto.cor),
      preco: new FormControl(produto.preco),
      tamanho: new FormControl(produto.tamanho),
      qtd: new FormControl(produto.qtd),
      descricao: new FormControl(produto.descricao)
    })
  }
  public cronometroEsconderMsg(): void {
    setTimeout(() => {
      this.respostaBoolean = null;
    }, 7000);
  }
}