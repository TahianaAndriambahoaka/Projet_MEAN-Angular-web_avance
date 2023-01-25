import { VoirFactureComponent } from './../voir-facture/voir-facture.component';
import { ChangerReparationAvancementComponent } from './../changer-reparation-avancement/changer-reparation-avancement.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

const ELEMENT_DATA = [
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9877TBS', marque: 'Ford Ranger', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Toyota Hilux', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
  {numero: '9876TBS', marque: 'Ford Raptor', avancement_reparation: '', facture: ''},
];

@Component({
  selector: 'app-voiture-garage',
  templateUrl: './voiture-garage.component.html',
  styleUrls: ['./voiture-garage.component.css']
})
export class VoitureGarageComponent {
  displayedColumns: string[] = ['numero', 'marque', 'avancement_reparation', 'facture'];
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

  changerReparationAvancement(numero: string) {
    this.dialog.open(ChangerReparationAvancementComponent, {
      data: {
        numero: numero
      }
    });
  }
  
  voirFacture(numero: string) {
    this.dialog.open(VoirFactureComponent, {
      data: {
        numero: numero
      }
    });
  }
}
