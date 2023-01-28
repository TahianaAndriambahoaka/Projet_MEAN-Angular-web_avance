import { VoirFactureComponent } from './../voir-facture/voir-facture.component';
import { ChangerReparationAvancementComponent } from './../changer-reparation-avancement/changer-reparation-avancement.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  etat: string
}

interface Voiture {
  marque: string,
  numero: string,
  reparation: Reparation[]
}


@Component({
  selector: 'app-voiture-garage',
  templateUrl: './voiture-garage.component.html',
  styleUrls: ['./voiture-garage.component.css']
})
export class VoitureGarageComponent implements OnInit {
  isLoading = true;
  error = false;
  liste_voiture!: Voiture[];
  displayedColumns: string[] = ['numero', 'marque', 'avancement_reparation', 'facture'];
  dataSource!: MatTableDataSource<Voiture>;

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
        'x-auth-token': sessionStorage.getItem('token-responsable_atelier')!
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
            let reparation : Reparation[] = [];
            element.mostRecentEvent.reparation.forEach((element2:any) => {
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
                etat: element2.etat
              };
              reparation.push(rep);
            });
            const voiture : Voiture = {
              marque: element.voiture_join[0].marque,
              numero: element.voiture_join[0].numero,
              reparation: reparation
            }
            this.liste_voiture.push(voiture);

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

  changerReparationAvancement(i: number) {
    var dialogRef = this.dialog.open(ChangerReparationAvancementComponent, {
      data: this.liste_voiture[i]
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.getData();
      }
    });
  }

  voirFacture(numero: string) {
    this.dialog.open(VoirFactureComponent, {
      data: {
        numero: numero
      }
    });
  }
}
