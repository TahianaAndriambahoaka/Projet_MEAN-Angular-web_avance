import { MaterialModule } from './material/material.module';
import { NgModule, ViewChild, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { FileUploadService } from './file-upload.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DropzoneDirective } from './directives/dropzone.directive';
import { SafePipe } from './safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListeVoitureComponent } from './client/liste-voiture/liste-voiture.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DepotDeVoitureComponent } from './client/depot-de-voiture/depot-de-voiture.component';
import { ReparationAvancementComponent } from './client/reparation-avancement/reparation-avancement.component';
import { HeaderComponent } from './client/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FactureEtatPaiementComponent } from './client/facture-etat-paiement/facture-etat-paiement.component';
import { SeparateurMillerPipe } from './separateur-miller.pipe';
import { HistoriqueReparationComponent } from './client/historique-reparation/historique-reparation.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InscriptionComponent,
    DropzoneDirective,
    SafePipe,
    ListeVoitureComponent,
    DepotDeVoitureComponent,
    ReparationAvancementComponent,
    HeaderComponent,
    FooterComponent,
    FactureEtatPaiementComponent,
    SeparateurMillerPipe,
    HistoriqueReparationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [SafePipe, FileUploadService, LiveAnnouncer, { provide: LOCALE_ID, useValue: "fr-FR" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
