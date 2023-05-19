import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Equipamento } from 'src/app/models/Equipamento';
import { EquipamentoService } from 'src/app/services/EquipamentoService.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  equipamentos=new Array<Equipamento>();

    
    constructor(
      private equipamentoService: EquipamentoService,
      private router: Router,

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

      deleteEquipamento(equipamento:Equipamento){

        Swal.fire({ 
          //'warning',
          title:"Tem certeza?",
          text:`Você está prestes a deletar o usuário ${equipamento.num_serie}`,
          showCancelButton: true,
         }).then(result=>{
           if(result.value){
             this.equipamentoService.equipamentoDelete(equipamento.id).subscribe(response=>{
              Swal.fire(
                "Success",
                "equipamento deletado com sucesso",
                "success"
              );
              this.equipamentos.splice(this.equipamentos.indexOf(equipamento),1);
             })
             
           }
         },err=>{
          Swal.fire(
            "Error",
            "Alguma coisa deu errado deletando o equipamento",
            "error"
          );
         })

      }
      updateEquipamento(id:number){
        this.router.navigate(['/cadastro/'+id])
      }

}
