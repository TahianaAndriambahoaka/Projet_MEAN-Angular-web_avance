import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DepotDeVoitureComponent } from '../depot-de-voiture/depot-de-voiture.component';

const ELEMENT_DATA = [
  {numero: 1, marque: 'Hydrogen', status: 'Déposée', plus: 'En savoir plus', historique: 'Historique des réparations'},
  {numero: 2, marque: 'Helium', status: 'En cours de réparation', plus: 'En savoir plus', historique: 'Historique des réparations'},
  {numero: 3, marque: 'Lithium', status: 'Réparée', plus: 'En savoir plus', historique: 'Historique des réparations'},
  {numero: 4, marque: 'Beryllium', status: 'Déposée', plus: 'En savoir plus', historique: 'Historique des réparations'},
  {numero: 5, marque: 'Boron', status: 'En cours de réparation', plus: 'En savoir plus', historique: 'Historique des réparations'},
  {numero: 6, marque: 'Carbon', status: 'Réparée', plus: 'En savoir plus', historique: 'Historique des réparations'},
  {numero: 7, marque: 'Nitrogen', status: 'Déposée', plus: 'En savoir plus', historique: 'Historique des réparations'},
  {numero: 8, marque: 'Oxygen', status: 'En cours de réparation', plus: 'En savoir plus', historique: 'Historique des réparations'},
  {numero: 9, marque: 'Fluorine', status: 'Réparée', plus: 'En savoir plus', historique: 'Historique des réparations'},
  {numero: 10, marque: 'Neon', status: 'Déposée', plus: 'En savoir plus', historique: 'Historique des réparations'},
];

@Component({
  selector: 'app-liste-voiture',
  templateUrl: './liste-voiture.component.html',
  styleUrls: ['./liste-voiture.component.css']
})
export class ListeVoitureComponent implements AfterViewInit {
  displayedColumns: string[] = ['numero', 'marque', 'status', 'plus', 'historique'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  rechercheNumero!: string | null;
  marques = [
    {value: 'steak-0'},
    {value: 'pizza-1'},
    {value: 'tacos-2'},
  ];

  constructor(private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DepotDeVoitureComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
