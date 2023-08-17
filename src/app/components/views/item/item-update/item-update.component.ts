import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

enum UnidadeMedida {
  KG = 'KG',
  L = 'L',
  g = 'g',
  ml = 'ml'
}


@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.css']
})
export class ItemUpdateComponent implements OnInit{
  
  //Validações
  name = new FormControl("", [Validators.minLength(3), Validators.maxLength(100)]);
  quantidade = new FormControl("", [Validators.min(1)]);
  unMedida = new FormControl("", [Validators.required]);
  valorUn = new FormControl("", [Validators.min(1)]);
  
  id_cat?: number = undefined;

  item: Item = {
    name: ``,
    quantidade: undefined,
    valorUn: undefined,
    unMedida: ``,
    total: 0
  }

  constructor(private service: ItemService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    const idItem = this.route.snapshot.paramMap.get("id");
    const idParam = this.route.snapshot.paramMap.get('id_cat');
    if (idParam !== null) {
      this.id_cat = +idParam; // Converte para número
    }

    if (idItem !== null) {
      this.item.id = +idItem; // Converte para número
    }
    this.findById()
  }

  unidadesPermitidas: UnidadeMedida[] = [UnidadeMedida.KG, UnidadeMedida.L, UnidadeMedida.g, UnidadeMedida.ml];
  selectedUnidade: UnidadeMedida | undefined;

  hasErrors(): boolean {
    return (
      this.name.invalid ||
      this.quantidade.invalid ||
      this.unMedida.invalid ||
      this.valorUn.invalid
    );
  }

  //mensagens caso der erro
  getMessage(fieldName: string): string {
    if (fieldName === 'name' && this.name.invalid) {
      return 'O campo NAME deve conter entre 3 e 100 caracteres';
    }
    
    if (fieldName === 'quantidade' && this.quantidade.invalid) {
      return 'O campo QUANTIDADE deve ser maior que 0';
    }
    
    if (fieldName === 'unMedida' && this.unMedida.invalid) {
      return 'O campo UN MEDIDA é requerido';
    }
    
    if (fieldName === 'valorUn' && this.valorUn.invalid) {
      return 'O campo VALOR UN deve ser maior que 0';
    }
  
    return '';
  }

  findById(): void{
      this.service.findById(this.item.id!).subscribe((resposta) => {
        this.item = resposta;
      })
  }

  update(): void{
    this.service.update(this.item.id!, this.id_cat!,this.item).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/item`])
      this.service.mensagem('Item deletado com sucesso!')
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }

  cancel(): void{
    this.router.navigate([`categorias/${this.id_cat}/item`])
  }
}
