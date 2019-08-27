import { Component, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { LoginService } from '../services/login.service';
import { Resposta } from 'src/shared/mensagem';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnChanges {
  public resposta: Resposta;
  constructor(private loginService: LoginService) { }
  @Output() logado = new EventEmitter();

  public usuario: FormGroup = new FormGroup({
    'login': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'senha': new FormControl(null, [Validators.required, Validators.min(8)])
  })
  public botaoDesabilitado: boolean = true;

  public entrar(): void {
    this.loginService.validarUsuario(this.usuario.value).subscribe((result: Resposta) => {
      if (result.logado) {
        this.loginService.setLogado();
        this.loginService.canActivate();
        this.logado.emit(true)
      }
    }, err => {
      console.log(err)
    });
  }
  ngOnInit() {
    setInterval(() => {
      this.botaoDesabilitado = (this.usuario.get('senha').valid && this.usuario.get('login').valid) ? false : true;
    }, 1000);
  }
  ngOnChanges() {
    console.log(this.botaoDesabilitado)
  }
}
