import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selector: 'app-voir-facture',
  templateUrl: './voir-facture.component.html',
  styleUrls: ['./voir-facture.component.css']
})
export class VoirFactureComponent {
  loading = false;
  displayedColumns: string[] = ['type', 'description', 'quantite', 'prix_unitaire', 'montant'];
  dataSource!: MatTableDataSource<Facture>;
  numero!: string;
  marque!: string;
  montantTotal!: number;
  montantPaye!: number;
  montantAPaye!: number;

  voiture!: Voiture;
  liste_reparation!: Reparation[];
  facture!: Facture[];
  estPaye: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Voiture, private dialogRef: MatDialogRef<VoirFactureComponent>, private snackBar: MatSnackBar) {
    this.voiture = data;
    this.liste_reparation = data.reparation;
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
  }
}
