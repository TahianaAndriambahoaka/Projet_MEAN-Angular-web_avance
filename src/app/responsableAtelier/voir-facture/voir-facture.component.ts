import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

var ELEMENT_DATA = [
  {type: 'Réparation', description: "Remplacement de la courroie d'accessoire", quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Réparation', description: 'Remplacement de la roue arrière gauche', quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Achat de pièces', description: 'Pneu arrière gauche', quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Achat de pièces', description: 'Filtre à huile', quantite: 1, prix_unitaire: 20000, montant: 0},
  {type: 'Achat de pièces', description: 'Courroie', quantite: 2, prix_unitaire: 20000, montant: 0},
];

@Component({
  selector: 'app-voir-facture',
  templateUrl: './voir-facture.component.html',
  styleUrls: ['./voir-facture.component.css']
})
export class VoirFactureComponent implements OnInit {
  displayedColumns: string[] = ['type', 'description', 'quantite', 'prix_unitaire', 'montant'];
  dataSource:any;
  numero!: string;
  marque!: string;
  montantTotal: number = 0;
  montantPaye: number = 0;
  montantAPaye: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.numero = data.numero;
  }

  ngOnInit() {
    this.montantTotal = 0;
    ELEMENT_DATA = ELEMENT_DATA.map(obj => {
      obj.montant = obj.prix_unitaire * obj.quantite;
      this.montantTotal += obj.montant;
      return obj;
    });
    this.montantAPaye = this.montantTotal - this.montantAPaye;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

}
