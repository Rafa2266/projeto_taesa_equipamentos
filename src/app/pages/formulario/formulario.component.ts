import { Component } from '@angular/core';
import { FormBuilder,FormControl,Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Equipamento } from 'src/app/models/Equipamento';
import { EquipamentoService } from 'src/app/services/EquipamentoService.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private equipamentoService:EquipamentoService
  ){}

  
  formEquipamento:FormGroup;

  ngOnInit(): void {
    this.setFormToRegister();
  }

  setFormToRegister(){
      this.formEquipamento = this.formBuilder.group({
        num_serie: new FormControl (null, Validators.required),
        fab: new FormControl(null, Validators.required),
        tipo: new FormControl(null, Validators.required),
        sub_estacao: new FormControl(null, Validators.required),
        nivel_tensao: new FormControl(null, Validators.required),
        data_entrada_operacao: new FormControl(null, Validators.required),
        status: new FormControl(false, Validators.required),
        obs: new FormControl(null),
      });
    
  }
  submitCadastro(){
    if(this.formEquipamento.valid){

      let equipamento=new Equipamento();
      equipamento.id=0;
      equipamento.num_serie=this.formEquipamento.value.num_serie
      equipamento.fab=this.formEquipamento.value.fab
      equipamento.tipo=this.formEquipamento.value.tipo
      equipamento.sub_estacao=this.formEquipamento.value.sub_estacao
      equipamento.data_entrada_operacao=this.formEquipamento.value.data_entrada_operacao
      equipamento.nivel_tensao=this.formEquipamento.value.nivel_tensao
      equipamento.status=this.formEquipamento.value.status?1:0;
      equipamento.obs=this.formEquipamento.value.obs
      this.createEquipamento(equipamento);

    }
  }
  createEquipamento(equipamento:Equipamento){
    this.equipamentoService.equipamentoCreate(equipamento).subscribe((res:any)=>{
      console.log(res)
      Swal.fire(
        "Success",
        "Equipamento " + res.num_serie + " registrado com sucesso",
        "success"
      );
     this.router.navigate(['/lista'])
      
     },err=>{
      Swal.fire(
        "Error",
        "Alguma coisa deu errado salvando o usuário",
        "error"
      );
     })
  }

}
