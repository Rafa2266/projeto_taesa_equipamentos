import { Component } from '@angular/core';
import { FormBuilder,FormControl,Validators,FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipamento } from 'src/app/models/Equipamento';
import { EquipamentoService } from 'src/app/services/EquipamentoService.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  equipamentoId:number;
  isEdit:boolean;
  formEquipamento:FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private equipamentoService:EquipamentoService
  ){
    this.route.params.subscribe(params => this.equipamentoId = params['id']);
  }

  

  ngOnInit(): void {
    this.setFormToRegister();
    if(this.equipamentoId){
      this.equipamentoService.equipamentoGetById(this.equipamentoId).subscribe((res) => {
        let equipamento=new Equipamento();
        Object.assign(equipamento,res);
        this.setFormToUpdate(equipamento);
      })
    }
    
  }

  setFormToRegister(){
      this.isEdit=false;
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
  setFormToUpdate(equipamento:Equipamento){
    this.isEdit=true;
    this.formEquipamento = this.formBuilder.group({
      num_serie: new FormControl (equipamento.num_serie, Validators.required),
      fab: new FormControl(equipamento.fab, Validators.required),
      tipo: new FormControl(equipamento.tipo, Validators.required),
      sub_estacao: new FormControl(equipamento.sub_estacao, Validators.required),
      nivel_tensao: new FormControl(equipamento.nivel_tensao, Validators.required),
      data_entrada_operacao: new FormControl(equipamento.data_entrada_operacao, Validators.required),
      status: new FormControl(equipamento.status==0, Validators.required),
      obs: new FormControl(equipamento.obs),
    });
  }
  submitCadastro(){
    if(this.formEquipamento.valid){

      let equipamento=new Equipamento();
      equipamento.id=this.isEdit?this.equipamentoId:0;
      equipamento.num_serie=this.formEquipamento.value.num_serie
      equipamento.fab=this.formEquipamento.value.fab
      equipamento.tipo=this.formEquipamento.value.tipo
      equipamento.sub_estacao=this.formEquipamento.value.sub_estacao
      equipamento.data_entrada_operacao=this.formEquipamento.value.data_entrada_operacao
      equipamento.nivel_tensao=this.formEquipamento.value.nivel_tensao
      equipamento.status=this.formEquipamento.value.status?0:1;
      equipamento.obs=this.formEquipamento.value.obs
      if(this.isEdit){
        this.updateEquipamento(equipamento)
      }else{
        this.createEquipamento(equipamento);
      }
      

    }
  }
  createEquipamento(equipamento:Equipamento){
    this.equipamentoService.equipamentoCreate(equipamento).subscribe((res:any)=>{
      Swal.fire(
        "Success",
        "Equipamento " + res.num_serie + " registrado com sucesso",
        "success"
      );
     this.router.navigate(['/lista'])
      
     },err=>{
      Swal.fire(
        "Error",
        "Alguma coisa deu errado registrando o equipamento",
        "error"
      );
     })
  }
  updateEquipamento(equipamento:Equipamento){
    this.equipamentoService.equipamentoUpdate(equipamento).subscribe((res:any)=>{
      Swal.fire(
        "Success",
        "Registro do equipamento " + res.num_serie + " atualizado com sucesso",
        "success"
      );
     this.router.navigate(['/lista'])
      
     },err=>{
      Swal.fire(
        "Error",
        "Alguma coisa deu errado atualizando o registro do equipamento",
        "error"
      );
     })
  }

}
