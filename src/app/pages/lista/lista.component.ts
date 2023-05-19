import { Component } from '@angular/core';
import { Equipamento } from 'src/app/models/Equipamento';
import { EquipamentoService } from 'src/app/services/EquipamentoService.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  equipamentos=new Array<Equipamento>();

    
    constructor(
      private equipamentoService: EquipamentoService
      ){}

      ngOnInit(): void {
        this.loadEquipamentos();
      }

      loadEquipamentos(){
        this.equipamentoService.equipamentoList().subscribe(
          (response) => {
            Object.assign(this.equipamentos, response);
          },
          (error) => {
            console.log(error);
          }
        );
      }

}
