import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { CategoriaDeleteComponent } from './components/views/categoria/categoria-delete/categoria-delete.component';
import { CategoriaUpdateComponent } from './components/views/categoria/categoria-update/categoria-update.component';
import { ItemAllComponent } from './components/views/item/item-all/item-all.component';
import { ItemCreateComponent } from './components/views/item/item-create/item-create.component';
import { ItemDeleteComponent } from './components/views/item/item-delete/item-delete.component';
import { ItemUpdateComponent } from './components/views/item/item-update/item-update.component';
import { ItemOuputComponent } from './components/views/item/item-ouput/item-ouput.component';
import { ItemEntryComponent } from './components/views/item/item-entry/item-entry.component';
import { LoginComponent } from './components/views/auth/login/login.component';
import { AuthGuard } from './components/guards/auth-guard';
import { AdminGuard } from './components/guards/admin-guard';
import { PaginaNaoEncontradaComponent } from './components/views/notfound/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { UsuarioAllComponent } from './components/views/usuario/usuario-all/usuario-all.component';
import { UsuarioUpdateComponent } from './components/views/usuario/usuario-update/usuario-update.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'categorias',
    component: CategoriaReadComponent,
    canActivate: [AuthGuard]
    },
  {
    path: 'categorias/create',
    component: CategoriaCreateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'categorias/delete/:id',
    component: CategoriaDeleteComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'categorias/update/:id',
    component: CategoriaUpdateComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'categorias/:id_cat/item',
    component: ItemAllComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias/:id_cat/item/create',
    component: ItemCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias/:id_cat/item/:id/delete',
    component: ItemDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias/:id_cat/item/:id/update',
    component: ItemUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias/:id_cat/item/:id/item-output',
    component: ItemOuputComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias/:id_cat/item/:id/item-entry',
    component: ItemEntryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    component: UsuarioAllComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'usuarios/update/:id',
    component: UsuarioUpdateComponent,
    canActivate: [AdminGuard]
  },
  //{
  //  path: 'pagina-nao-encontrada',
  //  component: PaginaNaoEncontradaComponent
  //},
  //{
  //  path: '**', 
  //  redirectTo: '/pagina-nao-encontrada' 
  //}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
