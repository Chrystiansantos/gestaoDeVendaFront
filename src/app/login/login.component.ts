import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { LoginService } from '../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public botaoDesabilitado: boolean = true;
  public usuario: FormGroup = new FormGroup({
    'login': new FormControl(),
    'senha': new FormControl()
  })
  public entrar(): void {
    this.loginService.validarUsuario(this.usuario);
  }
  //dentro do login ele ira validar e dar um navigate para a rota home
  ngOnInit() {
  }
}
