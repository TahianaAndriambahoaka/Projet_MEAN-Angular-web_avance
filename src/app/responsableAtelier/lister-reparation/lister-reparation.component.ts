import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

var LISTE_REPARATION: any[] = [];
var LISTE_ACHAT_PIECE: any[] = [];

@Component({
  selector: 'app-lister-reparation',
  templateUrl: './lister-reparation.component.html',
  styleUrls: ['./lister-reparation.component.css']
})
export class ListerReparationComponent {
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

  colonneReparation: string[] = ['reparation', 'prix', 'supprimer'];
  dataSourceReparation = new MatTableDataSource(LISTE_REPARATION);

  colonneAchatPiece: string[] = ['piece', 'quantite', 'prix', 'supprimer'];
  dataSourceAchatPiece = new MatTableDataSource(LISTE_ACHAT_PIECE);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
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
      LISTE_REPARATION.push({
        reparation: this.reparation,
        prix: this.prixReparation,
        supprimer: ''
      });
      this.reparation = null;
      this.prixReparation = null;
      this.dataSourceReparation = new MatTableDataSource(LISTE_REPARATION);
      this.form1Submitted = false;
    }
  }

  supprimerReparation(index: number) {
    LISTE_REPARATION.splice(index, 1);
    this.dataSourceReparation = new MatTableDataSource(LISTE_REPARATION);
  }

  ajoutAchatPiece() {
    this.form2Submitted = true;
    if (this.form2.valid) {
      LISTE_ACHAT_PIECE.push({
        piece: this.piece,
        quantite: this.quantite,
        prix: this.prixPiece,
        supprimer: ''
      });
      this.piece = null;
      this.quantite = null;
      this.prixPiece = null;
      this.dataSourceAchatPiece = new MatTableDataSource(LISTE_ACHAT_PIECE);
      this.form2Submitted = false;
    }
  }

  supprimerAchatPiece(index: number) {
    LISTE_ACHAT_PIECE.splice(index, 1);
    this.dataSourceAchatPiece = new MatTableDataSource(LISTE_ACHAT_PIECE);
  }

  submit() {
    console.log(LISTE_ACHAT_PIECE);
    console.log(LISTE_REPARATION);
    LISTE_ACHAT_PIECE = [];
    LISTE_REPARATION = [];
  }
}
