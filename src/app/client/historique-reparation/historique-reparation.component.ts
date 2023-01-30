import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from 'src/app/footer/footer.component';
import { HeaderComponent } from '../header/header.component';

const ELEMENT_DATA = [
  {reparation: 'Réparation ...', etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation'},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée'},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation'},
];

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
  selector: 'historique-reparation',
  templateUrl: './historique-reparation.component.html',
  styleUrls: ['./historique-reparation.component.css']
})
export class HistoriqueReparationComponent implements AfterViewInit, OnInit {
  isLoading = true;
  error = false;
  voiture!: Voiture;
  displayedColumns: string[] = ['reparation', 'debut', 'fin', 'etat_avancement'];
  dataSource!: MatTableDataSource<Reparation>;
  numero!: string;
  marque!: string;

  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.numero = params.get('numero')!;
      this.getData();
    });
  }

  @ViewChild(MatSort) sort!: MatSort;
  getData() {
    this.isLoading = true;
    fetch('https://garage-backend-sigma.vercel.app/voiture/voiture-present', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token-client')!
      }
    })
    .then(response => {
      const rep = response.json();
      const code = response.status;
      if(code == 200) {
        rep.then(data => {

          data.forEach((element:any) => {
            if(element.numero == this.numero) {
              let reparation : Reparation[] = [];
              element.evenement.reparation.forEach((element2:any) => {
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
              const voiture : Voiture = {
                marque: element.marque,
                numero: element.numero,
                reparation: reparation
              }
              this.voiture = voiture;
            }

          });
          this.dataSource = new MatTableDataSource(this.voiture.reparation);

          this.dataSource.sort = this.sort;
          if(document.getElementById('historiquereparation')) document.getElementById('historiquereparation')!.scrollIntoView({behavior: 'smooth'});


          this.isLoading = false;
          this.error = false;
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

  @ViewChild('historiquereparation') inputElement!: ElementRef;
  ngAfterViewInit() {
    if(!this.isLoading && !this.error) {
      this.inputElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.dataSource.sort = this.sort;
    }
  }

  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
