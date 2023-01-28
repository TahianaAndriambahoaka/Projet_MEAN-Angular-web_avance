import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

var ELEMENT_DATA = [
  {type: 'Réparation', description: "Remplacement de la courroie d'accessoire", quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Réparation', description: 'Remplacement de la roue arrière gauche', quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Achat de pièces', description: 'Pneu arrière gauche', quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Achat de pièces', description: 'Filtre à huile', quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Achat de pièces', description: 'Courroie', quantite: 2, prix_unitaire: 20000, montant: 0},
];

@Component({
  selector: 'facture-etat-paiement',
  templateUrl: './facture-etat-paiement.component.html',
  styleUrls: ['./facture-etat-paiement.component.css']
})
export class FactureEtatPaiementComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['type', 'description', 'quantite', 'prix-unitaire', 'montant'];
  dataSource:any;
  numero!: string;
  marque!: string;
  montantTotal: number = 0;
  montantPaye: number = 0;
  montantAPaye: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.numero = params.get('numero')!;
      this.montantTotal = 0;
      ELEMENT_DATA = ELEMENT_DATA.map(obj => {
        obj.montant = obj.prix_unitaire * obj.quantite;
        this.montantTotal += obj.montant;
        return obj;
      });
      this.montantAPaye = this.montantTotal - this.montantAPaye;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    });
  }

  @ViewChild('factureetatpaiement') inputElement!: ElementRef;
  ngAfterViewInit() {
    this.inputElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
