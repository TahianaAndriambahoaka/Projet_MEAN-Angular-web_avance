import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

@Component({
  selector: 'app-lister-reparation',
  templateUrl: './lister-reparation.component.html',
  styleUrls: ['./lister-reparation.component.css']
})
export class ListerReparationComponent {
  loading: boolean = false;
  numero!: string;

  form1!: FormGroup;
  form1Submitted: boolean = false;
  reparation!: string | null;
  prixReparation!: number | null;

  form2!: FormGroup;
  form2Submitted: boolean = false;
  piece!: string | null;
  quantite!: number | null;
  prixPiece!: number | null;

  liste_reparation: Reparation[] = [];
  tempId!:number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,private dialogRef: MatDialogRef<ListerReparationComponent>, private snackBar: MatSnackBar) {
    this.numero = data.numero;
    this.form1 = this.fb.group({
      reparation: ['', [Validators.required]],
      prixReparation: ['', [Validators.required]],
    });
    this.form2 = this.fb.group({
      piece: ['', [Validators.required]],
      quantite: ['', [Validators.required]],
      prixPiece: ['', [Validators.required]]
    });
  }

  get errorControlReparation() {
    return this.form1.controls;
  }

  get errorControlAchatPiece() {
    return this.form2.controls;
  }

  ajoutReparation() {
    this.form1Submitted = true;
    if (this.form1.valid) {
      const rep: Reparation = {
        achat_piece: [],
        frais: this.prixReparation!,
        debut_reparation: null,
        fin_reparation: null,
        description: this.reparation!,
        payement: null
      };
      this.liste_reparation.push(rep);
      this.form1.reset();
      this.form1Submitted = false;
    }
  }

  supprimerReparation(id:number) {
    this.liste_reparation.splice(id, 1);
  }

  clickBouttonAjoutAchatPiece(indice: number) {
    this.tempId = indice;
    document.getElementById('form2')?.setAttribute('style', '');
  }

  ajoutAchatPiece() {
    this.form2Submitted = true;
    if (this.form2.valid) {
      const ap: AchatPiece = {
        nom: this.piece!,
        pu: this.prixPiece!,
        quantite: this.quantite!
      }
      this.liste_reparation[this.tempId].achat_piece.push(ap);
      this.form2.reset();
      this.form2Submitted = false;
      document.getElementById('form2')?.setAttribute('style', 'display: none');
    }
  }

  supprimerAchatPiece(idRep:number, id: number) {
    this.liste_reparation[idRep].achat_piece.splice(id, 1);
  }

  submit() {
    this.loading = true;
    fetch('https://garage-backend-sigma.vercel.app/voiture/reception', {
        method: 'PUT',
        body: JSON.stringify({
          numero: this.numero,
          reparation: this.liste_reparation
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
          this.form1.reset();
          this.form2.reset();
          this.liste_reparation = [];
          this.snackBar.open('Voiture re??ue avec succ??s!', 'Fermer', {
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
