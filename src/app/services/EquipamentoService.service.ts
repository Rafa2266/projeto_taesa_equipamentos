import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Equipamento, Modifiers } from '../models/Equipamento';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class EquipamentoService{
    private readonly API= `${environment.API}/equipamentos/`;

    constructor(protected http: HttpClient) {}

    equipamentoList(modifiers:Modifiers){
        console.log(modifiers)
        return this.http
        .put(`${this.API}`,modifiers)
        .pipe();
      }

      equipamentoCreate(equipamento:Equipamento){
        return this.http
        .post(`${this.API}create`,equipamento)
        .pipe();
      }

      equipamentoUpdate(equipamento:Equipamento){
        return this.http
        .put(`${this.API}update/${equipamento.id}`,equipamento)
        .pipe();
      }

      equipamentoGetById(id:number){
        return this.http
        .get(`${this.API}edit/${id}`)
        .pipe(take(1));
      }

      equipamentoDelete(id:number){
        return this.http
        .delete(`${this.API}delete/${id}`)
        .pipe();
      }
  }