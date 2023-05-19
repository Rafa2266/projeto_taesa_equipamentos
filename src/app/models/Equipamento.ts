export class Equipamento{
    id:number;
    num_serie:string;
    fab:string;
    tipo:string;
    sub_estacao:string;
    data_entrada_operacao:string;
    nivel_tensao:string;
    status:number;
    obs:string;
}
export class Modifiers{
    fabFilter:string='';
    tipoFilter:string='';
    offset:number=0;
    order:string='';
    descOrasc='desc'
}