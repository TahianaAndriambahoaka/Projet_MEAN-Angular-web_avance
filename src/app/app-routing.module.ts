import { ListeVoitureComponent } from './client/liste-voiture/liste-voiture.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "inscription", component: InscriptionComponent },
  { path: "client", component: ListeVoitureComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
