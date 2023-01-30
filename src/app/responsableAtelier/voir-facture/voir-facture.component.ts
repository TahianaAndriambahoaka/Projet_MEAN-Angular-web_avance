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
  montantTotal: number = 0;
  montantPaye: number = 0;
  montantAPaye: number = 0;

  voiture!: Voiture;
  liste_reparation!: Reparation[];
  facture!: Facture[];
  estPaye: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Voiture, private dialogRef: MatDialogRef<VoirFactureComponent>, private snackBar: MatSnackBar) {
    this.voiture = data;
    this.liste_reparation = data.reparation;

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

  valider() {
    this.loading = true;
    fetch('https://garage-backend-sigma.vercel.app/voiture/validation-sortie', {
        method: 'PUT',
        body: JSON.stringify({
          numero: this.voiture.numero
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': sessionStorage.getItem('token-responsable_atelier')!
        }
      })
      .then(response => {
        this.loading = false;
        const code = response.status;
        console.log(code);
        console.log(response);
        if(code == 200) {
          this.liste_reparation = [];
          this.snackBar.open("Bon de sortie validé!", 'Fermer', {
            duration: 10000
          });
          this.dialogRef.close({ success: true });
        } else {
          response.json().then(data => {
            this.snackBar.open(data.message, 'Fermer', {
              duration: 10000
            });
          });
        }
      })
      .catch(error => {
        this.loading = false;
        console.error(error)
      })
  }
}
