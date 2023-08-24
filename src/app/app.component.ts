import { Component } from '@angular/core';
import { LoginComponent } from './components/views/auth/login/login.component';
import { usuarioService } from './components/views/auth/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  title = 'backerystock-front';

  isAuthenticated: boolean = false;

  constructor(private service: usuarioService){

  }

  ngOnInit(){
    this.service.isAuthenticatedEmitter.subscribe(
      isAuthenticated => isAuthenticated = isAuthenticated
    );
  }
}
