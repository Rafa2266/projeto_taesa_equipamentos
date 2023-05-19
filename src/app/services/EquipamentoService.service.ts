import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Equipamento } from '../models/Equipamento';
@Injectable({
    providedIn: 'root'
  })
  export class EquipamentoService{
    private readonly API= `${environment.API}/equipamentos/`;

    constructor(protected http: HttpClient) {}

    equipamentoList(){
        return this.http
        .get(`${this.API}`)
        .pipe();
      }

      equipamentoCreate(equipamento:Equipamento){
        return this.http
        .post(`${this.API}create`,equipamento)
        .pipe();
      }
  }