import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

var ELEMENT_DATA = [
  {type: 'Réparation', description: "Remplacement de la courroie d'accessoire", quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Réparation', description: 'Remplacement de la roue arrière gauche', quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Achat de pièces', description: 'Pneu arrière gauche', quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Achat de pièces', description: 'Filtre à huile', quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Achat de pièces', description: 'Courroie', quantite: 2, prix_unitaire: 20000, montant: 0},
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




      // this.isLoading = false;
      // const data = [
      //     {
      //         _id: "63d6c8bf099f083624e9e489",
      //         marque: "Renault Duster",
      //         numero: "1076TBA",
      //         idclient: "63d2cfb6cbf12c4dd4f1feec",
      //         evenement: {
      //             type: "reception",
      //             date: "2023-01-29T22:29:44.715Z",
      //             reparation: [
      //                 {
      //                     achat_piece: [
      //                         {
      //                             nom: "Pare brise",
      //                             pu: 300000,
      //                             quantite: 1
      //                         }
      //                     ],
      //                     frais: 20000,
      //                     debut_reparation: null,
      //                     fin_reparation: null,
      //                     description: "Changement pare brise",
      //                     payement: null
      //                 },
      //                 {
      //                     achat_piece: [
      //                         {
      //                             nom: "Lampes",
      //                             pu: 20000,
      //                             quantite: 2
      //                         }
      //                     ],
      //                     frais: 10000,
      //                     debut_reparation: null,
      //                     fin_reparation: null,
      //                     description: "Changement feux de frein",
      //                     payement: null
      //                 }
      //             ]
      //         }
      //     },
      //     {
      //         _id: "63d3f6f981ad11fb9dd9c28c",
      //         marque: "Lexus LX600",
      //         numero: "1076TBP",
      //         idclient: "63d2cfb6cbf12c4dd4f1feec",
      //         evenement: {
      //             type: "reception",
      //             date: "2023-01-29T13:22:01.569Z",
      //             reparation: [
      //                 {
      //                     achat_piece: [
      //                         {
      //                             nom: "Huile moteur",
      //                             pu: 20000,
      //                             quantite: 1
      //                         }
      //                     ],
      //                     frais: 10000,
      //                     debut_reparation: null,
      //                     fin_reparation: null,
      //                     description: "Vidange",
      //                     payement: null
      //                 }
      //             ]
      //         }
      //     }
      // ];
      // data.forEach((element:any) => {
      //   if(element.numero == this.numero) {
      //     let reparation : Reparation[] = [];
      //     element.evenement.reparation.forEach((element2:any) => {
      //       let achat_piece : AchatPiece[] = [];
      //       element2.achat_piece.forEach((element3:any) => {
      //         const ap : AchatPiece = {
      //           nom : element3.nom,
      //           pu : element3.pu,
      //           quantite : element3.quantite
      //         }
      //         achat_piece.push(ap);
      //       });
      //       const rep : Reparation = {
      //         frais: element2.frais,
      //         debut_reparation: element2.debut_reparation,
      //         fin_reparation : element2.fin_reparation,
      //         description : element2.description,
      //         achat_piece : achat_piece,
      //         payement: element2.payement
      //       };
      //       reparation.push(rep);
      //     });
      //     const voiture : Voiture = {
      //       marque: element.marque,
      //       numero: element.numero,
      //       reparation: reparation
      //     }
      //     this.voiture = voiture;
      //   }

      // });
      // this.liste_reparation = this.voiture.reparation;
      // this.montantTotal = 0;
      // this.montantPaye = 0;
      // this.montantAPaye = 0;



      // this.facture = [];
      // this.liste_reparation.forEach(element => {
      //   var paye = false;
      //   if (element.payement == null) {
      //     this.estPaye = false;
      //   } else {
      //     paye = true;
      //     this.montantPaye += element.frais;
      //   }
      //   let f : Facture = {
      //     type: 'Réparation',
      //     description: element.description,
      //     quantite: 1,
      //     prix_unitaire: element.frais,
      //     montant: element.frais
      //   };
      //   this.facture.push(f);
      //   element.achat_piece.forEach(element2 => {
      //     if (paye) {
      //       this.montantPaye += element2.pu*element2.quantite;
      //     }
      //     f = {
      //       type: 'Achat pièce',
      //       description: element2.nom,
      //       quantite: element2.quantite,
      //       prix_unitaire: element2.pu,
      //       montant: element2.quantite*element2.pu
      //     };
      //     this.facture.push(f);
      //   });
      // });

      // this.montantTotal = 0;
      // this.facture.forEach(element => {
      //   this.montantTotal += element.montant;
      // });
      // this.montantAPaye = this.montantTotal - this.montantPaye;
      // this.dataSource = new MatTableDataSource(this.facture);
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
      this.isLoading = false;
      this.error = false;
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
    this.inputElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
