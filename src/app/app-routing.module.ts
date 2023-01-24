import { VoitureGarageComponent } from './responsableAtelier/voiture-garage/voiture-garage.component';
import { ReceptionVoitureComponent } from './responsableAtelier/reception-voiture/reception-voiture.component';
import { AccueilComponent } from './responsableAtelier/accueil/accueil.component';
import { ListeVoitureComponent } from './client/liste-voiture/liste-voiture.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { ReparationAvancementComponent } from './client/reparation-avancement/reparation-avancement.component';
import { FactureEtatPaiementComponent } from './client/facture-etat-paiement/facture-etat-paiement.component';
import { HistoriqueReparationComponent } from './client/historique-reparation/historique-reparation.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "inscription", component: InscriptionComponent },
  {
    path: 'client',
    component: ListeVoitureComponent,
    children: [
      { path: 'reparation-avancement/:numero', component: ReparationAvancementComponent },
      { path: 'facture-etat-paiement/:numero', component: FactureEtatPaiementComponent },
      { path: 'historique-reparation/:numero', component: HistoriqueReparationComponent },
    ]
  },
  {
    path: "responsable-atelier",
    component: AccueilComponent,
    children: [
      { path: '', component: ReceptionVoitureComponent },
      { path: 'reception', component: ReceptionVoitureComponent },
      { path: 'voitures', component: VoitureGarageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
