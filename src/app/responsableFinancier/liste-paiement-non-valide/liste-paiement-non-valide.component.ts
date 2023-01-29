import { ValidationPaiementComponent } from './../validation-paiement/validation-paiement.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VoirFactureComponent as VoirFactureResponsableFinancierComponent } from '../voir-facture/voir-facture.component';

interface AchatPiece {
  nom: string,
  pu: number,
  quantite: number
}

interface Reparation {
  achat_piece: AchatPiece[],
  frais: number,
  debut_reparation: Date | null,
  fin_reparation: Date | null,
  description: string,
  payement: Date | null
}

interface Voiture {
  marque: string,
  numero: string,
  reparation: Reparation[]
}

@Component({
  selector: 'app-liste-paiement-non-valide',
  templateUrl: './liste-paiement-non-valide.component.html',
  styleUrls: ['./liste-paiement-non-valide.component.css']
})
export class ListePaiementNonValideComponent implements OnInit {
  isLoading = true;
  error = false;
  displayedColumns: string[] = ['numero', 'marque', 'etat_avancement', 'voirFacture'];
  dataSource!: MatTableDataSource<Voiture>;
  liste_voiture!: Voiture[];

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {}


  ngOnInit(): void {
    this.getData();
  }

  @ViewChild(MatSort) sort!: MatSort;
  getData() {
    this.isLoading = true;
    this.liste_voiture = [];
    fetch('https://garage-backend-sigma.vercel.app/voiture/non-sortie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token-responsable_financier')!
      }
    })
    .then(response => {
      this.isLoading = false;
      this.error = false;
      const rep = response.json();
      const code = response.status;
      if(code == 200) {
        rep.then(data => {
          data.forEach((element:any) => {
            let estRepare = true;
            let reparation : Reparation[] = [];
            element.mostRecentEvent.reparation.forEach((element2:any) => {
              if (element2.fin_reparation == null) {
                estRepare = false;
              }
              let achat_piece : AchatPiece[] = [];
              element2.achat_piece.forEach((element3:any) => {
                const ap : AchatPiece = {
                  nom : element3.nom,
                  pu : element3.pu,
                  quantite : element3.quantite
                }
                achat_piece.push(ap);
              });
              const rep : Reparation = {
                frais: element2.frais,
                debut_reparation: element2.debut_reparation,
                fin_reparation : element2.fin_reparation,
                description : element2.description,
                achat_piece : achat_piece,
                payement: element2.payement
              };
              reparation.push(rep);
            });
            if (estRepare) {
              const voiture : Voiture = {
                marque: element.voiture_join[0].marque,
                numero: element.voiture_join[0].numero,
                reparation: reparation
              }
              this.liste_voiture.push(voiture);
            }

          });
          this.dataSource = new MatTableDataSource(this.liste_voiture);
          this.dataSource.sort = this.sort;

        });
      } else {
        this.error = true;
        console.error("Une erreur s'est produite");
      }
    })
    .catch(error => {
      this.isLoading = false;
      this.error = true;
      console.error(error);
    })
  }


  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  etatAvancementReparation(i: number) {
    const dialogRef = this.dialog.open(ValidationPaiementComponent, {
      data: this.liste_voiture[i]
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.getData();
      }
    });
  }

  voirFacture(i: number) {
    this.dialog.open(VoirFactureResponsableFinancierComponent, {
      data: this.liste_voiture[i]
    });
  }
}
