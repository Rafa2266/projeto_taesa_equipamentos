import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ListaComponent } from './pages/lista/lista.component';

const routes: Routes = [
{path:"", redirectTo:"lista", pathMatch:"full" },
{path:"cadastro", component:FormularioComponent},
{path:"lista", component:ListaComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
