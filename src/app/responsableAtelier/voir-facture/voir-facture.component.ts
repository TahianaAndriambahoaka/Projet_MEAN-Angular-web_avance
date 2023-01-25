import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

var ELEMENT_DATA = [
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 1, prix: 20000, montant: 0},
  {description: 'Réparation ...', quantite: 2, prix: 20000, montant: 0},
];

@Component({
  selector: 'app-voir-facture',
  templateUrl: './voir-facture.component.html',
  styleUrls: ['./voir-facture.component.css']
})
export class VoirFactureComponent implements OnInit {
  displayedColumns: string[] = ['description', 'quantite', 'prix', 'montant'];
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
      obj.montant = obj.prix * obj.quantite;
      this.montantTotal += obj.montant;
      return obj;
    });
    this.montantAPaye = this.montantTotal - this.montantAPaye;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

}
