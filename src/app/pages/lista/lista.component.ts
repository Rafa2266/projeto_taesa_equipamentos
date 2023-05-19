import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,Validators,FormGroup } from '@angular/forms';
import { Equipamento ,Modifiers} from 'src/app/models/Equipamento';
import { EquipamentoService } from 'src/app/services/EquipamentoService.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  equipamentos=new Array<Equipamento>();
  modifiers=new Modifiers();
  formFilter:FormGroup;
  lastPage:boolean;
  numeroPagina=1;
  limiteDePaginas=5;

    
    constructor(
      private equipamentoService: EquipamentoService,
      private router: Router,
      private formBuilder: FormBuilder,

      ){}

      ngOnInit(): void {
        this.setFormToFilter();
        this.loadEquipamentos();
      }

      setFormToFilter(){
        this.formFilter=this.formBuilder.group({
          fabFilter:new FormControl(''),
          tipoFilter:new FormControl(''),
        })
      }

      loadEquipamentos(){
        this.equipamentoService.equipamentoList(this.modifiers).subscribe(
          (response) => {
            this.equipamentos=new Array<Equipamento>();
            Object.assign(this.equipamentos, response);
            if(this.equipamentos.length>this.limiteDePaginas){
              this.equipamentos.splice(this.limiteDePaginas,1);
              this.lastPage=false;
            }else{
              this.lastPage=true;
            }
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
          text:`Você está prestes a deletar o equipamento ${equipamento.num_serie}`,
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

      filtrarLista(){
        this.modifiers.fabFilter=this.formFilter.value.fabFilter;
        this.modifiers.tipoFilter=this.formFilter.value.tipoFilter;
        this.modifiers.offset=0;
        this.numeroPagina=1;
        this.loadEquipamentos();
      }

      ordenarLista(coluna:string){
        this.modifiers.order=this.modifiers.order==coluna?"":coluna;
        this.loadEquipamentos();
      }
      proximaPagina(){
        if(!this.lastPage){
          this.modifiers.offset+=this.limiteDePaginas
          this.loadEquipamentos();
          this.numeroPagina++;
        }

      }
      anteriorPagina(){
        if(this.numeroPagina>1){
          this.modifiers.offset-=this.limiteDePaginas
          this.loadEquipamentos();
          this.numeroPagina--;
        }
      }

}
