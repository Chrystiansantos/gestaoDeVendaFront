import { Component, OnInit } from '@angular/core';
import { estados } from 'src/shared/estados.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Resposta } from 'src/shared/mensagem';
import { Cliente } from 'src/shared/cliente.model';
//icons
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClienteService]
})
export class ClienteComponent implements OnInit {

  //icones
  public faEdit = faEdit;
  public faTrash = faTrash
  //variaveis responsavel pela mensagem de retorno ao cliente
  public msgRetorno: string;
  public respostaBoolean = null;
  //variavel responsavel por abrir os components edit
  private editCliente: boolean = false;
  //estados vindos do mock
  private estados = estados;

  public clientesCadastrados: Cliente[] = [];
  //fazer as validações de cliente
  private cliente: FormGroup = new FormGroup({
    'nome': new FormControl(null),
    'telefone': new FormControl(null),
    'cpf': new FormControl(null),
    'sexo': new FormControl(null),
    'cidade': new FormControl(null),
    'estado': new FormControl("Estados"),
    'cep': new FormControl(null),
    'rua': new FormControl(null),
    'numero': new FormControl(null),
    /*'login': new FormControl(null, [Validators.required, Validators.minLength(5)]),*/
  })

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.carregarClientes();
  }
  public cadastrarCliente(): void {
    this.clienteService.cadastrarCliente(new Cliente(null,
      null, this.cliente.value.nome,
      this.cliente.value.cpf,
      this.cliente.value.telefone,
      this.cliente.value.sexo,
      this.cliente.value.numero,
      this.cliente.value.cidade,
      this.cliente.value.cep,
      this.cliente.value.rua,
      this.cliente.value.estado)).subscribe((result: Resposta) => {
        console.log(result)
        if (result.msg != "Cliente inserido com sucesso !") {
          this.respostaBoolean = false;
          this.msgRetorno = result[0].msg;
          this.limparCliente();
          this.cronometroEsconderMsg();
        } else {
          this.respostaBoolean = true;
          this.msgRetorno = result.msg;
          this.limparCliente();
          this.carregarClientes();
          this.cronometroEsconderMsg();
        }
      }, (err: Resposta) => {
        this.msgRetorno = err.msg;
        this.respostaBoolean = false;
        this.cronometroEsconderMsg();
      });
  }
  public limparCliente(): void {
    this.cliente = new FormGroup({
      'nome': new FormControl(null),
      'telefone': new FormControl(null),
      'cpf': new FormControl(null),
      'sexo': new FormControl(null),
      'cidade': new FormControl(null),
      'estado': new FormControl("Estados"),
      'cep': new FormControl(null),
      'rua': new FormControl(null),
      'numero': new FormControl(null),
    })
    //this.imagem = "";
  }
  cancelarEdicao(): void {
    this.editCliente = false;
    this.limparCliente();
  }
  carregarClieneEditar(cliente) {
    this.editCliente = true;
    this.cliente = new FormGroup({
      'id': new FormControl(cliente._id),
      'nome': new FormControl(cliente.nome),
      'telefone': new FormControl(cliente.telefone),
      'cpf': new FormControl(cliente.cpf),
      'sexo': new FormControl(cliente.sexo),
      'cidade': new FormControl(cliente.cidade),
      'estado': new FormControl(cliente.estado),
      'cep': new FormControl(cliente.cep),
      'rua': new FormControl(cliente.endereco),
      'numero': new FormControl(cliente.numero),
      //'img': new FormControl(null)
      /*'login': new FormControl(null, [Validators.required, Validators.minLength(5)]),*/
    })
  }
  editarCliente() {
    this.clienteService.atualizarCliente(new Cliente(this.cliente.value.id,
      null, this.cliente.value.nome, this.cliente.value.cpf, this.cliente.value.telefone,
      this.cliente.value.sexo, this.cliente.value.numero,
      this.cliente.value.cidade, this.cliente.value.cep, this.cliente.value.rua,
      this.cliente.value.estado)).subscribe((result: Resposta) => {
        this.msgRetorno = result.msg;
        this.respostaBoolean = true;
        this.limparCliente();
        this.carregarClientes();
        this.cronometroEsconderMsg();
      }, (err: Resposta) => {
        this.respostaBoolean = false;
        this.msgRetorno = err.msg;
        this.cronometroEsconderMsg();
      })
  }
  deletarCliente(cliente) {
    this.cancelarEdicao();
    this.clienteService.deletarCliente(cliente).subscribe((result: Resposta) => {
      if (result.status == "ok") {
        this.respostaBoolean = true;
        this.msgRetorno = result.msg;
        this.cronometroEsconderMsg();
        this.carregarClientes();
      }
    }, (err: Resposta) => {
      this.respostaBoolean = false;
      this.msgRetorno = err.msg;
      this.cronometroEsconderMsg();
    })
  }
  carregarClientes() {
    this.clienteService.getClientes().subscribe((result: any/* Cliente[] */) => {
      this.clientesCadastrados = result;
      console.log(result);
    }, (err: Resposta) => {
      if (err.message == "Http failure response for http://localhost:8080/cliente: 0 Unknown Error") {
        this.respostaBoolean = false;
        this.msgRetorno = 'Por favor verifique sua conexão com a aplicação servidora !';
        this.cronometroEsconderMsg();
      }
    })
  }
  public cronometroEsconderMsg(): void {
    setTimeout(() => {
      this.respostaBoolean = null;
    }, 7000);
  }
}