import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

interface AchatPiece {
  nom: string,
  pu: number,
  quantite: number
}

interface Reparation {
  achat_piece: AchatPiece[],
  frais: number,
  debut_reparation: Date,
  fin_reparation: Date | null,
  description: string
}

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

  liste_reparation: Reparation[] = [];
  tempId!:number;

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
      const rep: Reparation = {
        achat_piece: [],
        frais: this.prixReparation!,
        debut_reparation: new Date(),
        fin_reparation: null,
        description: this.reparation!
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

  // supprimerReparation(index: number) {
  //   LISTE_REPARATION.splice(index, 1);
  //   this.dataSourceReparation = new MatTableDataSource(LISTE_REPARATION);
  // }

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
        const code = response.status;
        console.log(code);
        console.log(response);
        if(code == 200) {
          this.form1.reset();
          this.form2.reset();
          this.liste_reparation = [];
          document.getElementById('close')?.click();
        } else {
          console.error("Une erreur s'est produite");
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
}
