import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

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

interface Facture {
  type: string,
  description: string,
  quantite: number,
  prix_unitaire: number,
  montant: number
}

@Component({
  selector: 'facture-etat-paiement',
  templateUrl: './facture-etat-paiement.component.html',
  styleUrls: ['./facture-etat-paiement.component.css']
})
export class FactureEtatPaiementComponent implements AfterViewInit, OnInit {
  isLoading = true;
  error = false;
  voiture!: Voiture;
  liste_reparation!: Reparation[];
  facture!: Facture[];
  estPaye: boolean = true;
  displayedColumns: string[] = ['type', 'description', 'quantite', 'prix-unitaire', 'montant'];
  dataSource!: MatTableDataSource<Facture>;
  numero!: string;
  marque!: string;
  montantTotal: number = 0;
  montantPaye: number = 0;
  montantAPaye: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.numero = params.get('numero')!;
      this.getData();
    });
  }

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
          this.liste_reparation = this.voiture.reparation;
          this.montantTotal = 0;
          this.montantPaye = 0;
          this.montantAPaye = 0;



          this.facture = [];
          this.liste_reparation.forEach(element => {
            var paye = false;
            if (element.payement == null) {
              this.estPaye = false;
            } else {
              paye = true;
              this.montantPaye += element.frais;
            }
            let f : Facture = {
              type: 'Réparation',
              description: element.description,
              quantite: 1,
              prix_unitaire: element.frais,
              montant: element.frais
            };
            this.facture.push(f);
            element.achat_piece.forEach(element2 => {
              if (paye) {
                this.montantPaye += element2.pu*element2.quantite;
              }
              f = {
                type: 'Achat pièce',
                description: element2.nom,
                quantite: element2.quantite,
                prix_unitaire: element2.pu,
                montant: element2.quantite*element2.pu
              };
              this.facture.push(f);
            });
          });

          this.montantTotal = 0;
          this.facture.forEach(element => {
            this.montantTotal += element.montant;
          });
          this.montantAPaye = this.montantTotal - this.montantPaye;
          this.dataSource = new MatTableDataSource(this.facture);
          if(document.getElementById('factureetatpaiement')) document.getElementById('factureetatpaiement')!.scrollIntoView({behavior: 'smooth'});


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
  @ViewChild('factureetatpaiement') inputElement!: ElementRef;
  ngAfterViewInit() {
    if(!this.isLoading && !this.error) {
      this.inputElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
