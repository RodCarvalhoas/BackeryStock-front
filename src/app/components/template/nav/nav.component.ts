import { Component } from '@angular/core';
import { usuarioService } from '../../views/auth/usuario.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public usuarioService: usuarioService){}

  ngOnInit() {

  }

}
