import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [
  {reparation: 'Réparation ...', etat_avancement: 'Réparée', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'Réparée', changer: ''},
  {reparation: 'Réparation ...', etat_avancement: 'En cours de réparation', changer: ''},
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
  description: string
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
  displayedColumns: string[] = ['reparation', 'etat_avancement', 'changer'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  numero!: string;
  marque!: string;
  voiture!: Voiture;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Voiture) {
    this.numero = 'coco';
    this.voiture = data;
    console.log(this.voiture);
  }

  changer(index: number) {
    const etat = ELEMENT_DATA[index].etat_avancement;
    ELEMENT_DATA[index].etat_avancement = etat!='Réparée'?'Réparée':'En cours de réparation';
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  valider() {
    console.log(ELEMENT_DATA);
  }
}
