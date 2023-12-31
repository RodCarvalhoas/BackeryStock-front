import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './components/views/home/home.component';
import {MatCardModule} from '@angular/material/card';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CategoriaDeleteComponent } from './components/views/categoria/categoria-delete/categoria-delete.component';
import { CategoriaUpdateComponent } from './components/views/categoria/categoria-update/categoria-update.component';
import { ItemAllComponent } from './components/views/item/item-all/item-all.component';
import { ItemCreateComponent } from './components/views/item/item-create/item-create.component';
import { MatSelectModule } from '@angular/material/select';
import { ItemDeleteComponent } from './components/views/item/item-delete/item-delete.component';
import { ItemUpdateComponent } from './components/views/item/item-update/item-update.component';
import { ItemOuputComponent } from './components/views/item/item-ouput/item-ouput.component';
import { ItemEntryComponent } from './components/views/item/item-entry/item-entry.component';
import { LoginComponent } from './components/views/auth/login/login.component';
import { AuthGuard } from './components/guards/auth-guard';
import { usuarioService } from './components/views/usuario/usuario.service';
import { AdminGuard } from './components/guards/admin-guard';
import { PaginaNaoEncontradaComponent } from './components/views/notfound/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { UsuarioAllComponent } from './components/views/usuario/usuario-all/usuario-all.component';
import { UsuarioUpdateComponent } from './components/views/usuario/usuario-update/usuario-update.component';
import { UsuarioCreateComponent } from './components/views/usuario/usuario-create/usuario-create.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    CategoriaReadComponent,
    CategoriaCreateComponent,
    CategoriaDeleteComponent,
    CategoriaUpdateComponent,
    ItemAllComponent,
    ItemCreateComponent,
    ItemDeleteComponent,
    ItemUpdateComponent,
    ItemOuputComponent,
    ItemEntryComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
    UsuarioAllComponent,
    UsuarioUpdateComponent,
    UsuarioCreateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [usuarioService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
