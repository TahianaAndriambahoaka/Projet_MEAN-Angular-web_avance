import { ListerReparationComponent } from './../lister-reparation/lister-reparation.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9877TBS', marque: 'Ford Ranger', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Toyota Hilux', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', dateDepot: new Date(), reception: ''},
];

@Component({
  selector: 'app-reception-voiture',
  templateUrl: './reception-voiture.component.html',
  styleUrls: ['./reception-voiture.component.css']
})
export class ReceptionVoitureComponent implements AfterViewInit {
  displayedColumns: string[] = ['numero', 'marque', 'dateDepot', 'reception'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

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

  openDialog(numero: string) {
    this.dialog.open(ListerReparationComponent, {
      data: {
        numero: numero
      }
    });
  }

}
