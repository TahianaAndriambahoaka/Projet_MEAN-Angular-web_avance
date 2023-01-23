import { ListeVoitureComponent } from './client/liste-voiture/liste-voiture.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { ReparationAvancementComponent } from './client/reparation-avancement/reparation-avancement.component';
import { FactureEtatPaiementComponent } from './client/facture-etat-paiement/facture-etat-paiement.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "inscription", component: InscriptionComponent },
  {
    path: 'client',
    component: ListeVoitureComponent,
    children: [
      { path: 'reparation-avancement/:numero', component: ReparationAvancementComponent },
      { path: 'facture-etat-paiement/:numero', component: FactureEtatPaiementComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
