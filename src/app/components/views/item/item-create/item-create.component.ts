import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item.model';
import { FormControl, Validators } from '@angular/forms';

enum UnidadeMedida {
  KG = 'KG',
  L = 'L',
  g = 'g',
  ml = 'ml'
}

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.css']
})
export class ItemCreateComponent implements OnInit{

  //Validações
  name = new FormControl("", [Validators.minLength(3), Validators.maxLength(100)]);
  quantidade = new FormControl("", [Validators.min(1)]);
  unMedida = new FormControl("", [Validators.required]);
  valorUn = new FormControl("", [Validators.min(1)]);

  //id categoria em branco
  id_cat?: number = undefined;

  //obj item em branco
  item: Item = {
    name: ``,
    quantidade: undefined,
    valorUn: undefined,
    unMedida: ``,
    total: 0
  }

  //constructor do Component
  constructor(private service: ItemService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id_cat');
    if (idParam !== null) {
      this.id_cat = +idParam; // Converte para número
    }
  }

  //Unidades de medidas
  unidadesPermitidas: UnidadeMedida[] = [UnidadeMedida.KG, UnidadeMedida.L, UnidadeMedida.g, UnidadeMedida.ml];
  selectedUnidade: UnidadeMedida | undefined;

  //validação dos erros com o boolean
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

  //metodo para criar um item
  create(): void{
    this.service.create(this.id_cat!, this.item).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/item`])
    })

  }

  cancel(): void{
    this.router.navigate([`categorias`])
  }


}
