import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {
  
  categoria: Categoria = {
    id: undefined,
    name: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private route: ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      this.categoria.id = +idParam; // Converte para número
      this.findById()
    }
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria = resposta
      console.log(this.categoria)
    })
  }

  update(): void {
    this.service.update(this.categoria).subscribe((resposta) => {
      this.router.navigate(['categorias'])
      this.service.mensagem('Categoria atualizada com sucesso!');
    }, err => {
      for(let i = 0; i < err.error.errors.length; i++){
        this.service.mensagem(err.error.errors[i].message)
      }
    } )
  }

  cancel(): void {
    this.router.navigate(['categorias'])
  }

}
