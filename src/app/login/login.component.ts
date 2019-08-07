import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  public usuario: FormGroup = new FormGroup({
    'login': new FormControl(),
    'senha': new FormControl()
  })
  public entrar(): void {
    console.log(this.usuario.value)
  }
  ngOnInit() {
  }

}
