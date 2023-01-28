import { Component, Inject } from '@angular/core';
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
  etat: string
}

interface Voiture {
  marque: string,
  numero: string,
  reparation: Reparation[]
}

@Component({
  selector: 'app-changer-reparation-avancement',
  templateUrl: './changer-reparation-avancement.component.html',
  styleUrls: ['./changer-reparation-avancement.component.css']
})
export class ChangerReparationAvancementComponent {
  loading = false;
  displayedColumns: string[] = ['reparation', 'debut', 'fin', 'etat_avancement', 'changer'];
  dataSource!: MatTableDataSource<Reparation>;
  voiture!: Voiture;
  liste_reparation!: Reparation[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Voiture, private dialogRef: MatDialogRef<ChangerReparationAvancementComponent>, private snackBar: MatSnackBar) {
    this.voiture = data;
    this.liste_reparation = data.reparation;
    this.dataSource = new MatTableDataSource(this.liste_reparation);
    console.log(this.liste_reparation);
  }

  commencer(index: number) {
    this.loading = true;
    fetch('https://garage-backend-sigma.vercel.app/voiture/commencer-reparation', {
        method: 'PUT',
        body: JSON.stringify({
          numero: this.voiture.numero,
          description: this.liste_reparation[index].description
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
          this.snackBar.open("État d'avancement changé avec succès!", 'Fermer', {
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

  finir(index: number) {
    this.loading = true;
    fetch('https://garage-backend-sigma.vercel.app/voiture/finir-reparation', {
        method: 'PUT',
        body: JSON.stringify({
          numero: this.voiture.numero,
          description: this.liste_reparation[index].description
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
          this.snackBar.open("État d'avancement changé avec succès!", 'Fermer', {
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

  valider() {
    console.log(this.liste_reparation);
  }
}
